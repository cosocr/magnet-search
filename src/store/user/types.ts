export interface User {
  id: string
  name: string
  avatarUrl: string
  token: string
}
export const defaultUser: User = {
  id: '',
  token: '',
  name: '',
  avatarUrl: ''
}
export interface UserState {
  user: User
}
