import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {GithubHookService} from "./github.hook.service";

@Injectable()
export class GithubFacade {
  constructor(
    @Inject('GithubHookService') private readonly githubHookService: GithubHookService
  ) {}

  public async sendHookMessage (type: string, body: any): Promise<void> {
     try {
       await this.githubHookService.selectHookType(type, body);
     } catch (e) {
       console.error('GithubHookService.sendHookMessage()', e);
       throw new HttpException("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
     }
  }
}