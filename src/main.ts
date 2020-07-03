import express from 'express';
import hookRouter from "./hook/hook.router";
import discordRouter from "./discord/discord.router";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
})

app.use(hookRouter);
app.use(discordRouter);

app.listen(3000, () => {
  console.log('server start: http://localhost:3000');
})