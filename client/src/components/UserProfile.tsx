// components/Data.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../graphql/queries/UserQueries';

const Data: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      username: 'rahulvarma5297',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
    </>
  );
};

export default Data;