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
      `[저장소에 푸쉬 발생]`,
      `Repository: ${data.repository.name}`,
      `url: ${data.repository.html_url}`,
      `pusher: ${data.pusher.name}(${data.pusher.email})`,
      `\n[커밋정보]`,
      data.commits.map(commit => `${commit.message}        ${commit.timestamp}`).join('\n'),
    ].join('\n');
    return discordService.sendMessage(message);
  }

  createPRMessage (body: any) {
    const data: GithubPRHook = body as GithubPRHook;
    const message: string = [
      `////////////////////`,
      `[Pull Request]`,
      `action: ${data.action}`,
      `url: ${data.pull_request.html_url}`,
      `--------------------------`,
      `# ${data.pull_request.title}`,
      `\n${data.pull_request.body}\n`,
      `--------------------------`,
      `created_at: ${data.pull_request.created_at}`,
      `////////////////////`,
    ].join('\n');
    return discordService.sendMessage(message);
  }

  createPRReviewMessage (body: any) {
    const data: GithubPRReviewHook = body as GithubPRReviewHook;
    const message: string = [
      `////////////////////`,
      `[Pull Request]`,
      `action: ${data.action}`,
      `url: ${data.pull_request.html_url}`,
      `created_at: ${data.pull_request.created_at}`,
      `[Review]`,
      `reviewer: ${data.review.user.login}`,
      `body: ${data.review.body}`,
      `////////////////////`,
    ].join('\n');
    return discordService.sendMessage(message);
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