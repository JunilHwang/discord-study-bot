import express from 'express';
import hookRouter from '@/hook/hook.router';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
})

app.use(hookRouter);

app.listen(3000, () => {
  console.log('server start: http://localhost:3000');
})