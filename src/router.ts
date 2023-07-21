import { Router } from 'express';

const routes = Router()


routes.get('/', async (request, response) => {
    response.send("Esta operacional");
})

export {routes};