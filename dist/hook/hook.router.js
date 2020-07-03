import express from 'express';
const hookRouter = express.Router();
hookRouter.post('/api/github/hook', (request, response) => {
    const header = request.header;
    const payload = request.body;
    console.log(header);
    response.send('success');
});
export { hookRouter };
