export interface Question {
    acRate: number;
    difficulty: string;
    freqBar: any;
    frontendQuestionId: string;
    isFavor: boolean;
    paidOnly: boolean;
    status: any;
    title: string;
    titleSlug: string;
    topicTags: TopicTag[];
    hasSolution: boolean;
    hasVideoSolution: boolean;
}

export interface TopicTag {
    name: string;
    id: string;
    slug: string;
}