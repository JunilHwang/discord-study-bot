import express, {Request, Response} from 'express';
import { GithubHook } from "../github/github.domain";

const router = express.Router();

router.post('/api/github/hook', (request: Request, response: Response) => {
  const header = request.header;
  const payload: GithubHook = request.body;
  console.log(payload);
  console.log(header);
  response.send('success');
})

export default router;