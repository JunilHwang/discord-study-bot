import {Controller, Get, Post, Req} from "@nestjs/common";
import {Request} from "express";
import {GithubFacade} from "./github.facade";

@Controller('/api/github/hook')
export class GithubController {
  constructor(private readonly githubFacade: GithubFacade) {}

  @Get()
  public getHook () {
    return 'api/github/hook';
  }

  @Post()
  public createMessage (@Req() request: Request) {
    const eventType: string = request.headers['x-github-event'] as string;
    this.githubFacade.sendHookMessage(eventType, request.body);
    return 'success';
  }
}