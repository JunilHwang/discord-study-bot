import {Inject, Injectable} from "@nestjs/common";
import {DiscordService} from "../discord/discord.service";
import * as GithubHookTemplate from './github.hook.template';
import $http from 'axios';
import {IncomingHttpHeaders} from "http";
import {DefaultBody, GithubHook} from "domain/src";

@Injectable()
export class GithubHookService {
  constructor(
    @Inject('DiscordService') private readonly discordService: DiscordService
  ) {}

  public async selectHookType (type: string, channel: string, body: any): Promise<void> {
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
      await this.discordService.sendMessage(channel, GithubHookTemplate[method](body) + '\n');
    } catch (e) {
      console.error('HookService.selectHookType()', e);
      throw 'selectHookType';
    }
  }

  public async getHooks ({ token, url }: DefaultBody): Promise<GithubHook[]> {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    try {
      return await $http.get(url, {headers}).then(response => response.data)
    } catch (e) {
      console.log(e);
      throw 'getHooks';
    }
  }
}