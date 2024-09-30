// src/queries.ts
import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        realName
        aboutMe
        school
        websites
        countryName
        userAvatar
        reputation
        ranking
      }
    }
  }
`;