import {token} from './discord.secret';
import $http from 'axios';
import {Injectable} from "@nestjs/common";

const DISCORD_API_URL = 'https://discord.com/api/v6';

@Injectable()
export class DiscordService {
  private readonly channelURL: string = DISCORD_API_URL + '/channels/728575145236758558';
  private readonly headers: { [k: string]: string } = {
    'Authorization': `Bot ${token}`
  };

  constructor() {}

  sendMessage (content: string) {
    try {
      const {channelURL, headers} = this;
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