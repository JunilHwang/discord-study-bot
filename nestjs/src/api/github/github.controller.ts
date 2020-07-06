import {Controller, Get, HttpCode, HttpStatus, Post, Req} from "@nestjs/common";
import {Request} from "express";
import {GithubFacade} from "./github.facade";
import {GithubPrivateUser} from "domain/src";

@Controller('/api/github')
export class GithubController {
  constructor(private readonly githubFacade: GithubFacade) {}

  @Post('/hook')
  @HttpCode(HttpStatus.NO_CONTENT)
  public createMessage (@Req() request: Request): Promise<void> {
    const eventType: string = request.headers['x-github-event'] as string;
    return this.githubFacade.sendHookMessage(eventType, request.body);
  }

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  public getAuth (@Req() { body: { id, password } }: Request): Promise<GithubPrivateUser> {
    return this.githubFacade.getAuth(id, password);
  }
}