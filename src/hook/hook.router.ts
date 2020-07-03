import express, {Request, Response} from 'express';
import {IncomingHttpHeaders} from "http";
import { hookService } from "./hook.service";

const router = express.Router();

router.post('/api/github/hook', (request: Request, response: Response) => {
  const headers: IncomingHttpHeaders = request.headers;
  const eventType: string = headers['x-github-event'] as string;
  hookService.selectHookType(eventType, request.body);
  response.send('success');
})

export default router;