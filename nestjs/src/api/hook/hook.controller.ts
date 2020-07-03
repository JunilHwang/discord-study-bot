import {Controller, Get, Post, Req} from "@nestjs/common";
import {HookService} from "./hook.service";
import {Request} from "express";

@Controller('/api/github/hook')
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @Get()
  public getHook () {
    return 'api/github/hook';
  }

  @Post()
  public createMessage (@Req() request: Request) {
    const eventType: string = request.headers['x-github-event'] as string;
    this.hookService.selectHookType(eventType, request.body);
    return 'success';
  }
}