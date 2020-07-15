import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {GithubHookService} from "./github.hook.service";
import {GithubService} from "./github.service";
import {DefaultBody, GithubHook, GithubOrganization, GithubPrivateUser, GithubRepository} from "domain/src";

@Injectable()
export class GithubFacade {
  constructor(
    @Inject('GithubService') private readonly githubService: GithubService,
    @Inject('GithubHookService') private readonly githubHookService: GithubHookService,
  ) {}

  public async sendHookMessage (type: string, body: any): Promise<void> {
     try {
       await this.githubHookService.selectHookType(type, body);
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
      if (e !== 'getAuth') {
        console.error('GithubHookService.getAuth()', e);
      }
      throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }

  public async getOrgs ({ token, id }: DefaultBody): Promise<GithubOrganization[]> {
    try {
      return await this.githubService.getOrgs({ token, id });
    } catch (e) {
      if (e !== 'getAuth') {
        console.error('GithubHookService.getAuth()', e);
      }
      throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
  }
}