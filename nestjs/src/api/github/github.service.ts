import {Injectable} from "@nestjs/common";
import $http, {AxiosResponse} from 'axios'
import {IncomingHttpHeaders} from "http";
import {DefaultBody, GithubPrivateUser} from "domain/src";

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
      throw 'getAuth';
    }
  }

  public async getOrgs ({ token, id }: DefaultBody) {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    const ORGS_URL = `${BASE_URL}/users/${id}/orgs`
    try {
      return await $http.get(ORGS_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getOrgs(): ', e)
      throw 'getOrgs';
    }
  }

  public async getRepos ({ token, id }: DefaultBody) {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    const ORGS_URL = `${BASE_URL}/repos/${id}`
    try {
      return await $http.get(ORGS_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getRepos(): ', e)
      throw 'getRepos';
    }
  }
}