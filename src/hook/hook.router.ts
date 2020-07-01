import express, {Request, Response} from 'express';
import { GithubHook } from "../github/github.domain";
import {IncomingHttpHeaders} from "http";

const router = express.Router();

router.post('/api/github/hook', (request: Request, response: Response) => {
  const headers: IncomingHttpHeaders = request.headers;
  const payload: GithubHook = request.body;
  console.log(payload);
  console.log(headers);
  response.send('success');
})

export default router;