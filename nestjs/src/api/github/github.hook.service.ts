import {Inject, Injectable} from "@nestjs/common";
import {DiscordService} from "../discord/discord.service";
import * as GithubHookTemplate from './github.hook.template';

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
      await this.discordService.sendMessage(GithubHookTemplate[method](body))
    } catch (e) {
      console.error('HookService.selectHookType()', e);
      throw 'selectHookType';
    }
  }
}