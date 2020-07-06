import {Injectable} from "@nestjs/common";
import $http, {AxiosResponse} from 'axios'
import {IncomingHttpHeaders} from "http";
import {GithubPrivateUser} from "domain/src";

const BASE_URL = 'https://api.github.com';
const AUTH_URL = BASE_URL + '/user';

@Injectable()
export class GithubService {
  constructor() {}

  public async getAuth (token: string): Promise<GithubPrivateUser> {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    try {
      return await $http.get(AUTH_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getAuth(): ', e)
      return 'auth';
    }
  }
}