import { GET_QUESTION_LIST } from "./queries/QuestionQueries";
import { useLazyQuery } from '@apollo/client';
import { Question } from "./types/QuestionTypes";

interface ProblemsetQuestionList {
    __typename: string;
    total: number;
    questions: Question[];
}

interface DataResponse {
    problemsetQuestionList: ProblemsetQuestionList;
}

interface UseQuestionListResult {
    loading: boolean;
    error: any;
    data: DataResponse | undefined;
    fetchQuestions: (searchKeywords: string) => void;
}

export const useQuestionList = (): UseQuestionListResult => {
    const [fetchQuestions, { loading, error, data }] = useLazyQuery(GET_QUESTION_LIST);

    const fetchData = (searchKeywords: string) => {
        fetchQuestions({
            variables: {
                categorySlug: 'all-code-essentials',
                skip: 0,
                limit: 50,
                filters: {
                    searchKeywords
                },
            },
        });
    };

    return { loading, error, data, fetchQuestions: fetchData };
};
