// Data.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

// Define GraphQL query
const GET_STREAK = gql`
  query getStreakCounter {
    streakCounter {
      streakCount
      daysSkipped
      currentDayCompleted
    }
  }
`;

interface StreakCounter {
  streakCount: number;
  daysSkipped: number;
  currentDayCompleted: boolean;
}

interface GetStreakCounterData {
  streakCounter: StreakCounter | null;
}

const Data: React.FC = () => {
  const { loading, error, data } = useQuery<GetStreakCounterData>(GET_STREAK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <>
      {data && data.streakCounter ? (
        <table>
          <thead>
            <tr>
              <th>Streak Count</th>
              <th>Days Skipped</th>
              <th>Current Day Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.streakCounter.streakCount}</td>
              <td>{data.streakCounter.daysSkipped}</td>
              <td>{data.streakCounter.currentDayCompleted ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default Data;