import express, {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
})

app.post('/api/github/hook', (req: Request, res: Response) => {
  console.log(req.body);
  res.send('success');
})

app.listen(3000, () => {
  console.log('server start: http://localhost:3000');
})