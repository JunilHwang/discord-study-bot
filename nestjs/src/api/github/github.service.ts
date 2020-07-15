import {Injectable} from "@nestjs/common";
import $http from 'axios'
import {IncomingHttpHeaders} from "http";
import {DefaultBody, GithubCommonRequest, GithubOrganization, GithubPrivateUser, GithubRepository} from "domain/src";

const BASE_URL = 'https://api.github.com';

@Injectable()
export class GithubService {
  constructor() {}

  public async getAuth (token: string): Promise<GithubPrivateUser> {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    const AUTH_URL = BASE_URL + '/user';
    try {
      return await $http.get(AUTH_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getAuth(): ', e)
      throw 'getAuth';
    }
  }

  public async getOrgs ({ token, id }: GithubCommonRequest): Promise<GithubOrganization[]> {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    const ORGS_URL = `${BASE_URL}/users/${id}/orgs`
    try {
      return await $http.get(ORGS_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getOrgs(): ', e)
      throw 'getOrgs';
    }
  }

  public async getRepos ({ token, id }: GithubCommonRequest): Promise<GithubRepository[]> {
    const headers: IncomingHttpHeaders = { Authorization: `Basic ${token}` };
    const REPOS_URL = `${BASE_URL}/users/${id}/repos`
    try {
      return await $http.get(REPOS_URL, {headers}).then(({ data }) => data)
    } catch (e) {
      console.error('GithubService.getRepos(): ', e)
      throw 'getRepos';
    }
  }
}