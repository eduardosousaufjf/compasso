import { UserInterface } from 'src/model/User.class';

export interface RepoInterface {
  id: number,
  name: string,
  full_name: string,
  private: boolean,
  owner: UserInterface,
  html_url: string,
  description: string,
  fork: boolean,
  created_at: string,
  updated_at: string,
  open_issues: number,
  watchers: number
}
