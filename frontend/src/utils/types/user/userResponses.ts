export type Users = {
  // user: {
    fullName: string;
    _id: string,
    role: string,
    email: string,
  // }
}

export type ShowCurrentUserResponse = {
  user: {
    fullName: string;
    userId: string;
    role: string;
  }
}

export type GetAllUsersResponse = {
  users: Users[]
}