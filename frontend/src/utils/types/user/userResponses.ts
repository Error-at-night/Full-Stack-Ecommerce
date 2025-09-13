export type Users = {
    fullName: string;
    _id: string,
    role: string,
    email: string
}

export type ShowCurrentUserResponse = {
  user: {
    fullName: string,
    userId: string,
    role: string,
  }
}

export type GetAllUsersResponse = {
  users: Users[],
  page: number,
  limit: number,
  total: number
}

export type DeleteUserResponse = {
  message: string
}

