import {Request, Response, Router} from 'express';
import { discordService } from './discord.service';

const router = Router();

router.get('/api/discord/send/:message', async (req: Request, res: Response) => {
  await discordService.sendMessage(req.params.message)
  res.send('success');
})

export default router;