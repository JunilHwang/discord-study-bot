import express, {Request, Response} from 'express';
import {GithubHook} from "../github/github.domain";

const hookRouter = express.Router();

hookRouter.post('/api/github/hook', (request: Request, response: Response) => {
  const header = request.header;
  const payload: GithubHook = request.body;
  console.log(header);
  response.send('success');
})

export {
  hookRouter
};