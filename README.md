# DKU STUDY Discord Bot

본 저장소는 [DKU-STUDY](https://github.com/DKU-STUDY)의
[알고리즘](https://github.com/DKU-STUDY/Algorithm)과
[TodayReview](https://github.com/DKU-STUDY/TodayReview)에서 발생하는 이벤트를 감지 후
Discord bot을 통하여 메세지를 보내도록 만들어진 프로젝트입니다.


## 기술 스택

- node.js
- express.js: 초기에 express.js로 개발하였습니다.
- nestjs: 후에 nestjs로 마이그레이션을 진행하였습니다.
- vue.js: CMS를 만드는데 필요함
- [discord api](https://discord.com/developers/docs/intro)
- [discrod bot](https://discord.com/developers/docs/topics/oauth2#bots)
- [github webhook](https://developer.github.com/webhooks/))

## 핵심이 되는 코드

[./nestjs/src/api/discord/discord.service.ts](./nestjs/src/api/discord/discord.service.ts)

```ts
import {token} from './discord.secret';
import $http, {AxiosResponse} from 'axios';
import {Injectable} from "@nestjs/common";

// 디스코드 API의 base url
const DISCORD_API_URL = 'https://discord.com/api/v6';

// DKU-STUDY에서 봇 전용으로 사용할 channel 정보
const channelURL: string = DISCORD_API_URL + '/channels/728575145236758558';

// Bot의 인증 정보
const headers: { [k: string]: string } = {
  'Authorization': `Bot ${token}`
};

@Injectable()
export class DiscordService {

  /**
   * @param content {string}: 디스코드에 전달할 메세지 정보
   */
  public sendMessage (content: string): Promise<AxiosResponse|null> {
    try {
      const requestBody = {content, tts: false};
      const url = `${channelURL}/messages`;
      // discord api에 http post request 요청
      return $http.post(url, requestBody, { headers })
                  .catch(e => { throw e });
    } catch (e) {
      console.error('DiscordService.sendMessage()', e);
      return Promise.resolve(null);
    }
  }

}
```

[./nestjs/src/api/hook/hook.service.ts](./nestjs/src/api/hook/hook.service.ts)

```ts
import {Inject, Injectable} from "@nestjs/common";
import {DiscordService} from "../discord/discord.service";

// Github Hook에 대한 Type 정보
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
      return this[method](body).catch((e: any) => { throw e; })
    } catch (e) {
      console.error('HookService.selectHookType()', e);
    }
  }

  // Push에 대한 메세지 생성
  public createPushMessage (body: any): Promise<AxiosResponse> {
    const data: GithubPushHook = body as GithubPushHook;
    const message: string = [
      `[저장소에 푸쉬 발생]`,
      `Repository: __**${data.repository.name}**__`,
      `url: __**${data.repository.html_url}**__`,
      `pusher: __**${data.pusher.name}(${data.pusher.email})**__`,
      `\n[커밋정보]`,
      data.commits.map(commit => `${commit.message}        ${commit.timestamp}`).join('\n'),
    ].join('\n');
    return this.discordService.sendMessage(message);
  }

  // Pull Request에 대한 메세지 생성
  public createPRMessage (body: any): Promise<AxiosResponse> {
    const data: GithubPRHook = body as GithubPRHook;
    const message: string = [
      `[Pull Request]`,
      `action: __**${data.action}**__`,
      `url: __**${data.pull_request.html_url}**__`,
      `--------------------------`,
      `__**${data.pull_request.title}**__`,
      `${data.pull_request.body}`,
      `--------------------------`,
      `created_at: ${data.pull_request.created_at}`,
    ].join('\n');
    return this.discordService.sendMessage(message);
  }

  // PullRequest Review에 대한 메세지 생성
  public createPRReviewMessage (body: any): Promise<AxiosResponse> {
    const data: GithubPRReviewHook = body as GithubPRReviewHook;
    const message: string = [
      `[Pull Request Review]`,
      `action: __**${data.action}**__`,
      `url: __**${data.pull_request.html_url}**__`,
      `created_at: __**${data.pull_request.created_at}**__`,
      `[Review]`,
      `reviewer: __**${data.review.user.login}**__`,
      data.review.body,
    ].join('\n');
    return this.discordService.sendMessage(message);
  }

  // Pull Request Review Comment에 대한 메세지 생성
  public createPRReviewCommentMessage (body: any): Promise<AxiosResponse> {
    const data: GithubPRReviewCommentHook = body as GithubPRReviewCommentHook;
    const message: string = [
      `[Pull Request Review Comment]`,
      `action: __**${data.action}**__`,
      `url: __**${data.pull_request.html_url}**__`,
      `created_at: __**${data.pull_request.created_at}**__`,
      `[Comment]`,
      `writer: __**${data.comment.user.login}**__`,
      data.comment.body
    ].join('\n');
    return this.discordService.sendMessage(message);
  }

  // Issues에 대한 메세지 생성
  public createIssueMessage (body: any): Promise<AxiosResponse> {
    const data: GithubIssueHook = body as GithubIssueHook;
    const message: string = [
      `[Issue]`,
      `action: __**${data.action}**__`,
      `writer: __**${data.issue.user.login}**__`,
      `created_at: __**${data.issue.created_at}**__`,
      `url: __**${data.issue.html_url}**__`,
      data.issue.body,
    ].join('\n');
    return this.discordService.sendMessage(message);
  }

  // Issues Comment에 대한 메세지 생성
  public createIssueCommentMessage (body: any): Promise<AxiosResponse> {
    const data: GithubIssueCommentHook = body as GithubIssueCommentHook;
    const message: string = [
      `[Issue Comment]`,
      `writer: __**${data.comment.user.login}**__`,
      `created_at: __**${data.comment.created_at}**__`,
      `url: __**${data.comment.html_url}**__`,
      data.comment.body,
    ].join('\n');
    return this.discordService.sendMessage(message);
  }
}
```

[./nestjs/src/api/hook/hook.controller.ts](./nestjs/src/api/hook/hook.controller.ts)

```ts
import {Controller, Get, Post, Req} from "@nestjs/common";
import {HookService} from "./hook.service";
import {Request} from "express";

@Controller('/api/github/hook')
export class HookController {
  constructor(private readonly hookService: HookService) {}

  // test를 위한 메소드
  // http://133.186.218.195:3000/api/github/hook 요청시 "api/github/hook" 렌더링
  @Get()
  public getHook () {
    return 'api/github/hook';
  }

  // github webhook이 해당 메소드에 요청을 보냄
  // POST http://133.186.218.195:300/api/github/hook
  @Post()
  public createMessage (@Req() request: Request) {
    const eventType: string = request.headers['x-github-event'] as string;
    this.hookService.selectHookType(eventType, request.body);
    return 'success';

  }
}
```




...
