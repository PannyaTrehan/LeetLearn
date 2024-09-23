// components/Data.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUESTION_LIST } from '../graphql/queries/QuestionQueries';
import { Question } from '../graphql/types/QuestionTypes';

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