import { Router } from 'express';
const routes = Router()


routes.put('/api/v3/trips/:tripId', async (request, response) => {
    response.send("Esta operacional");
})

export {routes};