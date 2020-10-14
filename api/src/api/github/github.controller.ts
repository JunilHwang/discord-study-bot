import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {GithubFacade} from "./github.facade";
import {Token} from "../../decorators";
import {GithubHook, GithubOrganization, GithubRepository, GithubTinyRepository} from "domain/src";

@Controller('/api/github')
export class GithubController {
  constructor(private readonly githubFacade: GithubFacade) {}

  @Get('/hooks')
  @HttpCode(HttpStatus.OK)
  public getHooks (@Token() token: string, @Query('urls') urls: string): Promise<GithubHook[]> {
    return this.githubFacade.getMultipleHooks(token, urls.split(','));
  }

  @Get('/repos/:id')
  @HttpCode(HttpStatus.OK)
  public getRepos (@Token() token: string, @Param('id') id: string, @Req() request: Request): Promise<GithubTinyRepository[]> {
    return this.githubFacade.getRepos({ token, id });
  }

  @Get('/organizations/:id')
  @HttpCode(HttpStatus.OK)
  public getOrganizations (@Token() token: string, @Param('id') id: string): Promise<GithubOrganization[]> {
    return this.githubFacade.getOrgs({ token, id });
  }

  @Post('/hook/payload/:channel')
  @HttpCode(HttpStatus.NO_CONTENT)
  public createMessage (@Req() request: Request, @Param('channel') channel: string): Promise<void> {
    const eventType: string = request.headers['x-github-event'] as string;
    return this.githubFacade.sendHookMessage(eventType, channel, request.body);
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