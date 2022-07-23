declare namespace LoquizWebhook {
    export interface Game {
        id: string;
        title: string;
    }

    export interface Team {
        id: string;
        scope: string;
        name: string;
        members: string[];
        isFinished: boolean;
        startTime: number;
        finishTime: number;
        answersScore: number;
        bonusScore: number;
        totalScore: number;
        correctAnswers: number;
        incorrectAnswers: number;
        totalAnswers: number;
        hints: number;
        odometer: number;
    }

    export interface Payload {
        test: boolean;
        secret: string;
        timestamp: number;
        gameId: string;
        game: Game;
        team: Team;
    }
}