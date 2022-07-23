import {https, logger} from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const games: Record<string, boolean> = {};

/**
 * example payload:
 * {
 *     secret: 'secret',
 *     game: {
 *         id: 'gameId',
 *         title: 'gameTitle',
 *     },
 *     team: {
 *         id: 'teamId',
 *         name: 'teamName',
 *         answered: 3,
 *         score: 25
 *     }
 *     test: true
 * }
 */
export const onLoquizTeamFinished =
  https.onRequest(async (req, res) => {
    const {secret, game, team, test} = req.body as LoquizWebhook.Payload;

    if (! secret || ! game || ! team) {
      logger.error("No secret provided");
      res.status(400).send("No secret provided");
      return;
    }

    try {
      const gameId = `${game.id}${test ? "-test" : ""}`;
      logger.info(`Payload: ${gameId} ${game.title}: ${team.name}`);

      if (!games[gameId]) {
        await db.collection("games").doc(gameId).set({
          title: game.title,
          test: !!test,
        }, {merge: true});
        games[gameId] = true;
      }

      await db.collection(`games/${gameId}/scores`).doc(team.id).set({
        name: team.name,
        members: team.members?.join(", ") ?? "",
        answered: team.totalAnswers ?? 0,
        score: team.totalScore ?? 0,
      }, {merge: true});

      res.send("Thanks for the update");
    } catch (e) {
      logger.error(e);
      res.status(500).send(e);
    }
  });