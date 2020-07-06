import {Inject, Injectable} from "@nestjs/common";
import {DiscordService} from "../discord/discord.service";
import {
  GithubIssueCommentHook,
  GithubIssueHook,
  GithubPRHook,
  GithubPRReviewCommentHook,
  GithubPRReviewHook,
  GithubPushHook
} from "domain/src/github";
import {AxiosResponse} from "axios";

@Injectable()
export class GithubHookService {
  constructor(
    @Inject('DiscordService') private readonly discordService: DiscordService
  ) {}

  public async selectHookType (type: string, body: any): Promise<void> {
    const types: { [k: string]: string } = {
      'push': 'createPushMessage',
      'pull_request': 'createPRMessage',
      'pull_request_review': 'createPRReviewMessage',
      'pull_request_review_comment': 'createPRReviewCommentMessage',
      'issues': 'createIssueMessage',
      'issue_comment': 'createIssueCommentMessage',
    };
    const method: string|undefined = types[type];
    if (method === undefined) return;
    try {
      await this.discordService.sendMessage(this[method](body))
    } catch (e) {
      console.error('HookService.selectHookType()', e);
      throw 'selectHookType';
    }
  }

  public createPushMessage ({ repository, pusher, commits }: GithubPushHook): string {
    return [
      `[저장소에 푸쉬 발생]`,
      `Repository: __**${repository.name}**__`,
      `url: __**${repository.html_url}**__`,
      `pusher: __**${pusher.name}(${pusher.email})**__`,
      `\n[커밋정보]`,
      commits.map(commit => `${commit.message}        ${commit.timestamp}`).join('\n'),
    ].join('\n');
  }

  public createPRMessage ({ action, pull_request }: GithubPRHook): string {
    return [
      `[Pull Request]`,
      `action: __**${action}**__`,
      `url: __**${pull_request.html_url}**__`,
      `created_at: ${pull_request.created_at}`,
      `__**${pull_request.title}**__`,
      pull_request.body,
    ].join('\n');
  }

  public createPRReviewMessage ({ action, pull_request, review }: GithubPRReviewHook): string {
    return [
      `[Pull Request Review]`,
      `action: __**${action}**__`,
      `url: __**${pull_request.html_url}**__`,
      `reviewer: __**${review.user.login}**__`,
      `created_at: __**${pull_request.created_at}**__`,
      review.body,
    ].join('\n');
  }

  public createPRReviewCommentMessage ({ action, pull_request, comment }: GithubPRReviewCommentHook): string {
    return [
      `[Pull Request Review Comment]`,
      `action: __**${action}**__`,
      `url: __**${pull_request.html_url}**__`,
      `writer: __**${comment.user.login}**__`,
      `created_at: __**${pull_request.created_at}**__`,
      comment.body
    ].join('\n');
  }

  public createIssueMessage ({ action, issue }: GithubIssueHook): string {
    return [
      `[Issue]`,
      `action: __**${action}**__`,
      `url: __**${issue.html_url}**__`,
      `writer: __**${issue.user.login}**__`,
      `created_at: __**${issue.created_at}**__`,
      issue.body,
    ].join('\n');
  }

  public createIssueCommentMessage ({ comment }: GithubIssueCommentHook): string {
    return [
      `[Issue Comment]`,
      `url: __**${comment.html_url}**__`,
      `writer: __**${comment.user.login}**__`,
      `created_at: __**${comment.created_at}**__`,
      comment.body,
    ].join('\n');
  }
}