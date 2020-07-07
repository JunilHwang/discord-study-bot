import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {GithubFacade} from "./github.facade";
import {Token} from "../../decorators";

@Controller('/api/github')
export class GithubController {
  constructor(private readonly githubFacade: GithubFacade) {}

  @Get('/hooks')
  @HttpCode(HttpStatus.NO_CONTENT)
  public getHooks (@Token() token: string, @Body() { owner }): null {
    return null
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
    response
      .cookie('access_token', token, { maxAge: 1000 * 60 * 60 })
      .json(userInfo);
  }
}