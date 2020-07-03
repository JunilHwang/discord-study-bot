# DKU STUDY Discord Bot

본 저장소는 [DKU-STUDY](https://github.com/DKU-STUDY)의
[알고리즘](https://github.com/DKU-STUDY/Algorithm)과
[TodayReview](https://github.com/DKU-STUDY/TodayReview)에서 발생하는 이벤트를 감지 후
Discord bot을 통하여 메세지를 보내도록 만들어진 프로젝트입니다.


## 기술 스택

- node.js
- express.js: 초기에 express.js로 개발하였습니다.
- nestjs: 후에 nestjs로 마이그레이션을 진행하였습니다.
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
   * @param content 디스코드에 전달할 메세지 정보
   */
  public sendMessage (content: string): Promise<AxiosResponse|null> {
    try {
      const requestBody = {content, tts: false};
      const url = `${channelURL}/messages`;
      return $http.post(url, requestBody, { headers })
                  .catch(e => { throw e });
    } catch (e) {
      console.error('DiscordService.sendMessage()', e);
      return Promise.resolve(null);
    }
  }

}
```