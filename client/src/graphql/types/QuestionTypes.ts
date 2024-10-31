export interface Question {
    acRate: number; //percentage of users that got this question right
    difficulty: string; //Easy, Hard etc.
    frontendQuestionId: string; //leetcode question number
    title: string; //question title
    topicTags: TopicTag[]; //leetcode tags (e.g. dynamic programming)
}

export interface TopicTag {
    name: string;
    id: string;
    slug: string;
}