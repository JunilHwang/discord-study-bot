import express, {Request, Response} from 'express';
import {IncomingHttpHeaders} from "http";

const router = express.Router();

router.post('/api/github/hook', (request: Request, response: Response) => {
  const headers: IncomingHttpHeaders = request.headers;
  const eventType = headers['x-github-event'];
  const payload = request.body;
  console.log(payload);
  console.log(eventType);
  response.send('success');
})

export default router;