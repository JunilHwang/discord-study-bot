import express, {Request, Response} from 'express';

const router = express.Router();

router.post('/api/github/hook', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('success');
})

export default router;