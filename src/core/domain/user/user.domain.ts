export interface UserDomain {
  userId: number;
  nickname: string | null;
  thumbnailUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
