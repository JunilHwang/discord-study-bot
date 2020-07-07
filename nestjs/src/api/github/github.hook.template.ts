import {
  GithubIssueCommentHook,
  GithubIssueHook,
  GithubPRHook,
  GithubPRReviewCommentHook,
  GithubPRReviewHook,
  GithubPushHook
} from "domain/src/github";

export const createPushMessage = ({ repository, pusher, commits }: GithubPushHook): string => [
  `[저장소에 푸쉬 발생]`,
  `Repository: __**${repository.name}**__`,
  `url: __**${repository.html_url}**__`,
  `pusher: __**${pusher.name}(${pusher.email})**__`,
  `\n[커밋정보]`,
  commits.map(commit => `${commit.message}        ${commit.timestamp}`).join('\n'),
].join('\n')

export const createPRMessage = ({ action, pull_request }: GithubPRHook): string => [
  `[Pull Request]`,
  `action: __**${action}**__`,
  `url: __**${pull_request.html_url}**__`,
  `created_at: ${pull_request.created_at}`,
  `__**${pull_request.title}**__`,
  pull_request.body,
].join('\n')

export const createPRReviewMessage = ({ action, pull_request, review }: GithubPRReviewHook): string => [
  `[Pull Request Review]`,
  `action: __**${action}**__`,
  `url: __**${pull_request.html_url}**__`,
  `reviewer: __**${review.user.login}**__`,
  `created_at: __**${pull_request.created_at}**__`,
  review.body,
].join('\n')

export const createPRReviewCommentMessage = ({ action, pull_request, comment }: GithubPRReviewCommentHook): string => [
  `[Pull Request Review Comment]`,
  `action: __**${action}**__`,
  `url: __**${pull_request.html_url}**__`,
  `writer: __**${comment.user.login}**__`,
  `created_at: __**${pull_request.created_at}**__`,
  comment.body
].join('\n')

export const createIssueMessage = ({ action, issue }: GithubIssueHook): string => [
  `[Issue]`,
  `action: __**${action}**__`,
  `url: __**${issue.html_url}**__`,
  `writer: __**${issue.user.login}**__`,
  `created_at: __**${issue.created_at}**__`,
  issue.body,
].join('\n')

export const createIssueCommentMessage = ({ comment }: GithubIssueCommentHook): string => [
  `[Issue Comment]`,
  `url: __**${comment.html_url}**__`,
  `writer: __**${comment.user.login}**__`,
  `created_at: __**${comment.created_at}**__`,
  comment.body,
].join('\n')