import {token} from './discord.secret';
import axios from 'axios';

const DISCORD_API_URL = 'https://discord.com/api/v6';

class DiscordService {
  constructor() {
    this.channelURL = DISCORD_API_URL + '/channels/728516777562079244';
    this.headers = {
      Authorization: `Bot ${token}`
    };
  }

  sendMessage(content) {
    const requestBody = { content, tts: false };
    const url = `${this.channelURL}/messages`;
    return axios.post(url, requestBody, { headers });
  }
}

export const discordService: DiscordService = new DiscordService();