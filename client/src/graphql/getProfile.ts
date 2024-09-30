import { GET_USER_PROFILE } from "../graphql/queries/UserQueries";
import { useLazyQuery } from '@apollo/client';
import { UserProfile } from "../graphql/types/UserTypes";

interface DataResponse {
  matchedUser: UserProfile;
}

interface UserProfileResult {
  loading: boolean;
  error: any;
  data: DataResponse | undefined;
  fetchProfile: () => void;
}

export const useUserProfile = (): UserProfileResult => {
  const [fetchProfile, { loading, error, data }] = useLazyQuery<DataResponse>(GET_USER_PROFILE);

  const fetchData = () => {
    fetchProfile({
      variables: {
        username: 'rahulvarma5297',
      },
    });
  };

  return { loading, error, data, fetchProfile: fetchData };
};