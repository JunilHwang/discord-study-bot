import {Injectable} from "@nestjs/common";
import $http, {AxiosResponse} from 'axios'
import {IncomingHttpHeaders} from "http";
import {GithubPrivateUser} from "domain/src";

const BASE_URL = 'https://api.github.com';
const AUTH_URL = BASE_URL + '/user';

@Injectable()
export class GithubService {
  constructor() {}

  public async getAuth ({ id, password }): Promise<GithubPrivateUser> {
    const basicToken: string = new Buffer(`${id}:${password}`).toString('base64');
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${basicToken}` };
    try {
      return await $http.get(AUTH_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getAuth(): ', e)
      return null;
    }
  }
}