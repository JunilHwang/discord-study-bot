import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {GithubHookService} from "./github.hook.service";
import {GithubService} from "./github.service";
import {
  DefaultBody,
  GithubCommonRequest,
  GithubHook,
  GithubOrganization,
  GithubPrivateUser,
  GithubRepository, GithubTinyRepository
} from "domain/src";

const repoToTinyRepo = ({ id, node_id, name, full_name, html_url, description, url, hooks_url, created_at, updated_at }: GithubRepository): GithubTinyRepository =>
  ({ id, node_id, name, full_name, html_url, description, url, hooks_url, created_at, updated_at })

@Injectable()
export class GithubFacade {
  constructor(
    @Inject('GithubService') private readonly githubService: GithubService,
    @Inject('GithubHookService') private readonly githubHookService: GithubHookService,
  ) {}

  public async sendHookMessage (type: string, channel: string, body: any): Promise<void> {
     try {
       await this.githubHookService.selectHookType(type, channel, body);
     } catch (e) {
       if (e !== 'selectHookType') {
         console.error('GithubHookService.sendHookMessage()', e);
       }
       throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
     }
  }

  public async getAuth (token: string): Promise<GithubPrivateUser> {
    try {
      return await this.githubService.getAuth(token);
    } catch (e) {
      if (e !== 'getAuth') {
        console.error('GithubHookService.getAuth()', e);
      }
      throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }

  public async getMultipleHooks (token: string, hooksUrls: string[]): Promise<GithubHook[]> {
    try {
      const allHooks: GithubHook[][] = await Promise.all(hooksUrls.map(url => this.githubHookService.getHooks({ token, url })));
      return allHooks.reduce((flatHooks, hooks) => [ ...flatHooks, ...hooks ], []);
    } catch (e) {
      if (e !== 'getMultipleHooks') {
        console.error('GithubHookService.getMultipleHooks()', e);
      }
      throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }

  public async getRepos (githubCommonRequest: GithubCommonRequest): Promise<GithubTinyRepository[]> {
    try {
      const repos = await this.githubService.getRepos(githubCommonRequest);
      return repos.map(repoToTinyRepo);
    } catch (e) {
      if (e !== 'getRepos') {
        console.error('GithubHookService.getRepos()', e);
      }
      throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }

  public async getOrgs (githubCommonRequest: GithubCommonRequest): Promise<GithubOrganization[]> {
    try {
      return await this.githubService.getOrgs(githubCommonRequest);
    } catch (e) {
      if (e !== 'getOrgs') {
        console.error('GithubHookService.getOrgs()', e);
      }
      throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }
}