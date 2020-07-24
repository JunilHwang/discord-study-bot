import {Controller, Get, Req, Res} from "@nestjs/common";
import {Request} from "express";

@Controller('/api/common')
export class CommonController {

  @Get('/ip')
  public getIP (@Req() request: Request): string {
    if (request.headers['x-forwarded-for']) {
      const addr = request.headers['x-forwarded-for'];
      return typeof addr === 'string' ? addr : addr.join(',');
    }
    return request.connection.remoteAddress;
  }
}