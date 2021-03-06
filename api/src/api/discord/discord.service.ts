import {token} from './discord.secret';
import $http, {AxiosResponse} from 'axios';
import {Injectable} from "@nestjs/common";

const DISCORD_API_URL = 'https://discord.com/api/v6';
const channelURL: string = DISCORD_API_URL + '/channels';
const headers: { [k: string]: string } = {
  'Authorization': `Bot ${token}`
};

@Injectable()
export class DiscordService {

  public sendMessage (channel: string, content: string): Promise<AxiosResponse|null> {
    try {
      const requestBody = {content, tts: false};
      const url = `${channelURL}/${channel}/messages`;
      return $http.post(url, requestBody, { headers })
                  .catch(e => { throw e });
    } catch (e) {
      console.error('DiscordService.sendMessage()', e);
      return Promise.resolve(null);
    }
  }

}