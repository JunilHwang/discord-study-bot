import { discordService } from "../discord/discord.service";
import {
  GithubIssueCommentHook,
  GithubIssueHook,
  GithubPRHook,
  GithubPRReviewCommentHook,
  GithubPRReviewHook,
  GithubPushHook
} from "../github/domain";

export class HookService {

  selectHookType (type: string, body: any) {
    const types: { [k: string]: Function } = {
      'push': this.createPushMessage,
      'pull_request': this.createPRMessage,
      'pull_request_review': this.createPRReviewMessage,
      'pull_request_review_comment': this.createPRReviewCommentMessage,
      'issues': this.createIssueMessage,
      'issue_comment': this.createIssueCommentMessage,
    };
    const method: Function|undefined = types[type];
    if (method === undefined) return;

    method(body);
  }

  createPushMessage (body: any) {
    const data: GithubPushHook = body as GithubPushHook;
    const message: string = [
      `[기본정보]`,
      `Repository: ${data.repository.name}`,
      `url: ${data.repository.html_url}`,
      `pusher: ${data.pusher.name}(${data.pusher.email})`,
      `[커밋정보]`,
      data.commits.map(commit => `${commit.message} ${commit.timestamp}`).join('\n'),
    ].join('\n');
    return discordService.sendMessage(message);
  }

  createPRMessage (body: any) {
    const data: GithubPRHook = body as GithubPRHook;
    return discordService.sendMessage('createPRMessage');
  }

  createPRReviewMessage (body: any) {
    const data: GithubPRReviewHook = body as GithubPRReviewHook;
    return discordService.sendMessage('createPRReviewMessage');
  }

  createPRReviewCommentMessage (body: any) {
    const data: GithubPRReviewCommentHook = body as GithubPRReviewCommentHook;
    return discordService.sendMessage('createPRReviewCommentMessage');
  }

  createIssueMessage (body: any) {
    const data: GithubIssueHook = body as GithubIssueHook;
    return discordService.sendMessage('createIssueMessage');
  }

  createIssueCommentMessage (body: any) {
    const data: GithubIssueCommentHook = body as GithubIssueCommentHook;
    return discordService.sendMessage('createIssueCommentMessage');
  }

}

export const hookService: HookService = new HookService();