import {GithubRepository, Pusher, Sender, Commit, PullRequest} from "./base";

export interface GithubPushHook {
  ref: string;
  before: string;
  after: string;
  repository: GithubRepository;
  pusher: Pusher;
  sender: Sender;
  created: boolean;
  deleted: boolean;
  forced: boolean;
  base_ref?: string;
  compare: string;
  commits: Commit[];
  head_commit: Commit;
}

export interface GithubPullRequestHook {
  action: string
  number: number,
  pull_request: PullRequest,
  repository: GithubRepository,
  sender: Sender
}