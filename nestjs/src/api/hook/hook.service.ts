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
export class HookService {
  constructor(
    @Inject('DiscordService') private readonly discordService: DiscordService
  ) {}

  public selectHookType (type: string, body: any): Promise<any> {
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
      return this.discordService
                 .sendMessage(this[method](body))
                 .catch((e: any) => { throw e; })
    } catch (e) {
      console.error('HookService.selectHookType()', e);
    }
  }

  public createPushMessage (body: any): string {
    const data: GithubPushHook = body as GithubPushHook;
    return [
      `[저장소에 푸쉬 발생]`,
      `Repository: __**${data.repository.name}**__`,
      `url: __**${data.repository.html_url}**__`,
      `pusher: __**${data.pusher.name}(${data.pusher.email})**__`,
      `\n[커밋정보]`,
      data.commits.map(commit => `${commit.message}        ${commit.timestamp}`).join('\n'),
    ].join('\n');
  }

  public createPRMessage (body: any): string {
    const data: GithubPRHook = body as GithubPRHook;
    return [
      `[Pull Request]`,
      `action: __**${data.action}**__`,
      `url: __**${data.pull_request.html_url}**__`,
      `--------------------------`,
      `__**${data.pull_request.title}**__`,
      `${data.pull_request.body}`,
      `--------------------------`,
      `created_at: ${data.pull_request.created_at}`,
    ].join('\n');
  }

  public createPRReviewMessage (body: any): string {
    const data: GithubPRReviewHook = body as GithubPRReviewHook;
    return [
      `[Pull Request Review]`,
      `action: __**${data.action}**__`,
      `url: __**${data.pull_request.html_url}**__`,
      `created_at: __**${data.pull_request.created_at}**__`,
      `[Review]`,
      `reviewer: __**${data.review.user.login}**__`,
      data.review.body,
    ].join('\n');
  }

  public createPRReviewCommentMessage (body: any): string {
    const data: GithubPRReviewCommentHook = body as GithubPRReviewCommentHook;
    return [
      `[Pull Request Review Comment]`,
      `action: __**${data.action}**__`,
      `url: __**${data.pull_request.html_url}**__`,
      `created_at: __**${data.pull_request.created_at}**__`,
      `[Comment]`,
      `writer: __**${data.comment.user.login}**__`,
      data.comment.body
    ].join('\n');
  }

  public createIssueMessage (body: any): string {
    const data: GithubIssueHook = body as GithubIssueHook;
    return [
      `[Issue]`,
      `action: __**${data.action}**__`,
      `writer: __**${data.issue.user.login}**__`,
      `created_at: __**${data.issue.created_at}**__`,
      `url: __**${data.issue.html_url}**__`,
      data.issue.body,
    ].join('\n');
  }

  public createIssueCommentMessage (body: any): string {
    const data: GithubIssueCommentHook = body as GithubIssueCommentHook;
    return [
      `[Issue Comment]`,
      `writer: __**${data.comment.user.login}**__`,
      `created_at: __**${data.comment.created_at}**__`,
      `url: __**${data.comment.html_url}**__`,
      data.comment.body,
    ].join('\n');
  }
}