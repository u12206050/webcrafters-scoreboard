<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import {computed, inject, onMounted, ref} from "vue";
import ScoreRow from "./components/ScoreRow.vue";
import { debounce } from "lodash";
import { Index } from "flexsearch";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import type { Firestore, QuerySnapshot, DocumentData } from "@firebase/firestore";

interface Game {
  id: string;
  title: string;
}

interface Score {
  id: string;
  name: string;
  members?: string;
  score: number;
  rank?: number;
  game: Game;
}

const db = inject('firestore') as Firestore

const index = new Index({
  preset: 'match',
  tokenize: 'full',
  cache: 100,
});

const gameStore = ref<Record<string, Game>>({})
const scoreStore = ref<Record<string, Score>>({});

const isTest = ref(false)

function init() {
  isTest.value = location.search.includes('test')
  onSnapshot(query(collection(db, 'games'), where('test', '==', isTest.value)), (gameCollection) => {
    gameCollection.docs.forEach(doc => {
      if (!gameStore.value[doc.id]) {
        const G = doc.data() as Game
        G.id = doc.id
        gameStore.value[doc.id] = G

        onSnapshot(query(collection(db, `games/${G.id}/scores`)), debounce((scoreCollection: QuerySnapshot) => {
          scoreCollection.docs.forEach(scoreDoc => {
            const S = scoreDoc.data() as Score
            S.id = scoreDoc.id
            S.game = G
            scoreStore.value[S.id] = S
            index.add(S.id, `${S.name} ${S.members || S.game.title}`)
          })
        }, 100, { maxWait: 1000 }))
      }
    })
  })
}

onMounted(init)

const params = new URLSearchParams(window.location.search)
const activeTeam = params.get('team_id') ?? ''

const source = computed(() => {
  let ranked = Object.values(scoreStore.value)
  ranked.sort((a, b) => b.score - a.score)
  ranked.forEach((s, index) => {
    s.rank = index + 1
  })
  return ranked
})

const searchValue = ref('')

let offset = ref(100)
let pageSize = 100
const scores = computed(() => {
  if (searchValue.value) {
    const result = index.search(searchValue.value, { suggest: true, limit: offset.value})
    const scores: Array<Score> = []
    result.forEach((id: string | number) => scores.push(scoreStore.value[String(id)]))

    offset.value = scores.length < 100 ? 100 : scores.length
    scores.sort((a, b) => b.score - a.score)
    return scores.slice(0, offset.value)
  }

  let results = source.value.slice(0, offset.value)
  let activeTeamScore = scoreStore.value[activeTeam]
  if (activeTeamScore && (activeTeamScore.rank! > offset.value)) {
    results.push(activeTeamScore)
  }
  return results
})

let s = false
function loadMore({ complete, loaded, error }: Record<string, Function>) {
  if (! source.value.length) {
    return loaded()
  }
  if (offset.value >= source.value.length) {
    complete()
    return
  }

  if (! s) {
    s = true
    setTimeout(() => {
      offset.value += pageSize
      s = false
      loaded()
    }, 50)
  }
}
</script>

<template>
  <div id="score-list" class="w-full bg-background text-prime">
    <div class="w-full max-w-screen-lg py-4 mx-auto px-4 sm:px-8">

      <div v-if="isTest" class="bg-amber-50 text-amber-500 rounded-sm opacity-90 text-sm font-bold p-2 text-center">SHOWING TEST DATA</div>

      <div class="sticky top-0 z-40 pt-4 px-4">
        <div class="w-full my-4">
          <input name="search" v-model="searchValue" placeholder="Search..."
                 class="py-3 px-4 shadow-sm text-prime focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-xl" />
        </div>
      </div>

      <div class="my-4">
        <transition-group name="flip-list" appear>
          <ScoreRow v-for="(row, index) in scores" :key="row.id"
                    :rank="row.rank"
                    :name="row.name"
                    :members="row.members || row.game.title"
                    :score="row.score"
                    :is-active="row.id === activeTeam"
          />
        </transition-group>
        <infinite-loading target="#score-list" @infinite="loadMore" class="text-center p-4" />
      </div>
    </div>

    <infinite-loading @infinite="loadMore" class="opacity-0" />
  </div>
</template>

<style>
.flip-list-move {
  transition: all 0.8s ease;
  z-index: 40;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}
</style>