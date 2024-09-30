export interface UserProfileDetails {
  realName: string | null;
  aboutMe: string | null;
  school: string | null;
  websites: string[];
  countryName: string | null;
  userAvatar: string;
  reputation: number;
  ranking: number;
}

export interface UserProfile {
  username: string;
  profile: UserProfileDetails;
}