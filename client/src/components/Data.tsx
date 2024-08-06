
// components/Data.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUESTION_LIST } from '../graphql/queries/QuestionQueries';

interface TopicTag {
  name: string;
  id: string;
  slug: string;
}

interface Question {
  acRate: number;
  difficulty: string;
  freqBar: any; // Adjust type if known
  frontendQuestionId: string;
  isFavor: boolean;
  paidOnly: boolean;
  status: any; // Adjust type if known
  title: string;
  titleSlug: string;
  topicTags: TopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
}

interface DataResponse {
  total: number;
  questions: Question[];
}

const Data: React.FC = () => {
  const { loading, error, data } = useQuery(GET_QUESTION_LIST, {
    variables: {
      categorySlug: 'all-code-essentials',
      skip: 0,
      limit: 50,
      filters: {
        searchKeywords: "cat"
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    console.log(data);

  return (
    <>
      {data && data.problemsetQuestionList && (
        <table>
          <thead>
            <tr>
              <th>Frontend ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Acceptance Rate</th>
              <th>Topics</th>
            </tr>
          </thead>
          <tbody>
            {data.problemsetQuestionList.questions.map((question: Question) => (
              <tr key={question.frontendQuestionId}>
                <td>{question.frontendQuestionId}</td>
                <td>{question.title}</td>
                <td>{question.difficulty}</td>
                <td>{question.acRate}</td>
                <td>
                  {question.topicTags.map(tag => (
                    <span key={tag.id}>{tag.name}, </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Data;