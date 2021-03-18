import { ScenarioPreview } from './scenarios';

// Personal user class containing all relevant info pertaining to the current user.
export class UserData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    joined: string;
    profilePrivate: boolean;
    avatar: string;
    ranking: {
        rank: string;
        xp: number;
        xpTilNext: number;
        baseRankXp: number;
    };
    performance: PerformanceData;
    playlist: Array<ScenarioPreview>;
    builds: Array<{}>;
    favourites: Array<{}>;
    friends: Array<{}>;
    discussions: Array<{}>;
}

// Performance data taken from the UserData document
export class PerformanceData {
    scores: {
        overall: number;
        skill: {
            history: number;
            investigation: number;
            management: {};
        };
    };
    subject: {};
    previouslyPlayed: Array<ScenarioPreview>;
    previouslyPlayedDetails: {};
}

// Other user class containing all relevant information pertaining to other user.
export class OtherUser {
    id: string;
    username: string;
    joined: string;
    avatar: string;
    performance: PerformanceData;
    ranking: {
        rank: string;
        xp: number;
        xpTilNext: number;
        baseRankXp: number;
    };
    builds: Array<{}>;
    favourites: Array<{}>;
}
