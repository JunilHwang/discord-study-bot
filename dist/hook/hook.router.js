import express from 'express';
const hookRouter = express.Router();
hookRouter.post('/api/github/hook', (request, response) => {
    const header = request.header;
    const payload = request.body;
    response.send('success');
});
export { hookRouter };
