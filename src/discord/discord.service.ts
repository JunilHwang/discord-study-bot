import {token} from './discord.secret';
import axios from 'axios';

const DISCORD_API_URL = 'https://discord.com/api/v6';

class DiscordService {
  private readonly channelURL: string;

  constructor() {
    this.channelURL = DISCORD_API_URL + '/channels/728516777562079244';
    this.headers = {
      Authorization: `Bot ${token}`
    };
  }

  sendMessage(content) {
    try {
      const {channelURL, headers} = this;
      const requestBody = {content, tts: false};
      const url = `${channelURL}/messages`;
      return axios.post(url, requestBody, {headers});
    } catch (e) {
      console.error('DiscordService.sendMessage()', e);
      return Promise.resolve(null);
    }
  }
}

export const discordService: DiscordService = new DiscordService();