import {GithubRepository, Pusher, Sender, Commit, PullRequest, Review, GithubComment, GithubIssue} from "./base";

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

export interface GithubPRHook {
  action: string;
  number: number;
  pull_request: PullRequest;
  repository: GithubRepository;
  sender: Sender;
}

export interface GithubPRReviewHook {
  action: string;
  review: Review;
  pull_request: PullRequest;
  repository: GithubRepository;
  sender: Sender;
}

export interface GithubPRReviewCommentHook {
  action: string;
  comment: GithubComment,
  pull_request: PullRequest;
  repository: GithubRepository;
  sender: Sender;
}

export interface GithubIssueHook {
  action: string;
  issue: GithubIssue;
  repository: GithubRepository;
  sender: Sender;
}

export interface GithubIssueCommentHook {
  action: string;
  issue: GithubIssue;
  comment: GithubComment;
  repository: GithubRepository;
  sender: Sender;
}