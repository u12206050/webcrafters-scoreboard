<template>
  <div class="py-1 sm:py-2" :class="isActive ? 'sticky bottom-0 top-0 z-50' : ''">
    <div class="rounded-xl text-lg sm:text-xl font-medium py-2 sm:py-4 pl-2 pr-4 sm:pl-4 sm:pr-8 flex items-center"
      :class="isActive ? 'border-2 border-yellow bg-blue-alt' : 'border border-white-30'"
    >
      <p class="text-yellow w-10 text-right">{{ rank }}.</p>
      <div class="px-4 flex-1">
        <p class="capitalize">{{ name }}</p>
        <p class="sm:text-lg text-gray-300 capitalize">{{ members }}</p>
      </div>
      <div class="leading-tight text-center">
        <p class="text-xs sm:text-sm">Score</p>
        <p class="text-yellow text-xl">{{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rank: Number,
    name: String,
    members: String,
    score: [Number, String],
    isActive: Boolean
  }
}
</script>