export interface DiscussionBoard {
    id: string;
    username: string;
    topic: string;
    title: string;
    post: string;
    dateTimePosted: number;
    comments: Array<{username: string; timestamp: number, comment: string}>;
}

export interface QuestionBankItem {
    id: string;
    creator: string;
    specialty: string;
    questionType: string;
    question: string;
    vitals?: {};
    investigations?: Array<{}>;
    medications?: Array<{}>;
    answers: Array<{}>;
}
