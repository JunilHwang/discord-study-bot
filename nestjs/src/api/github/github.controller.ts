import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {GithubFacade} from "./github.facade";
import {Token} from "../../decorators";
import {GithubHook, GithubOrganization, GithubRepository} from "domain/src";

@Controller('/api/github')
export class GithubController {
  constructor(private readonly githubFacade: GithubFacade) {}

  @Get('/hooks')
  @HttpCode(HttpStatus.OK)
  public getHooks (@Token() token: string, @Query('urls') urls: string): Promise<GithubHook[]> {
    return this.githubFacade.getMultipleHooks(token, urls.split(','));
  }

  @Get('/repos')
  @HttpCode(HttpStatus.OK)
  public getRepos (@Token() token: string, @Query('id') id: string): Promise<GithubRepository[]> {
    return this.githubFacade.getRepos({ token, id });
  }

  @Get('/organizations')
  @HttpCode(HttpStatus.OK)
  public getOrganizations (@Token() token: string, @Query('id') id: string): Promise<GithubOrganization[]> {
    return this.githubFacade.getOrgs({ token, id });
  }

  @Post('/hook/payload')
  @HttpCode(HttpStatus.NO_CONTENT)
  public createMessage (@Req() request: Request): Promise<void> {
    const eventType: string = request.headers['x-github-event'] as string;
    return this.githubFacade.sendHookMessage(eventType, request.body);
  }

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  public async getAuth (
    @Req() { body: { id, password } }: Request,
    @Res() response: Response
  ): Promise<void> {
    const token = Buffer.from(`${id}:${password}`).toString('base64');
    const userInfo = await this.githubFacade.getAuth(token);
    response.cookie('access_token', token, { maxAge: 1000 * 60 * 60 })
            .json(userInfo);
  }
}