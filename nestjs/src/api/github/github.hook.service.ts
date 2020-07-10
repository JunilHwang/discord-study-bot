import {Inject, Injectable} from "@nestjs/common";
import {DiscordService} from "../discord/discord.service";
import * as GithubHookTemplate from './github.hook.template';
import $http from 'axios';
import {IncomingHttpHeaders} from "http";

const getBaseUrl = ({ owner, repo }) => `https://api.github.com/repos/${owner}/${repo}/hooks`;

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

    if (method === undefined) {
      return;
    }

    if (body.action && ['labeled', 'assigned', 'edited'].includes(body.action)) {
      return;
    }

    try {
      await this.discordService.sendMessage(GithubHookTemplate[method](body) + '\n');
    } catch (e) {
      console.error('HookService.selectHookType()', e);
      throw 'selectHookType';
    }
  }

  public async getHooks (token: string, owner: string, repo: string) {
    const url: string = getBaseUrl({ owner, repo });
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    try {
      return await $http.get(url, {headers}).then(response => response.data)
    } catch (e) {
      console.log(e);
      throw 'getHooks';
    }
  }
}