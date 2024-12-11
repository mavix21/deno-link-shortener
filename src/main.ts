import { Router } from './router.ts';

const app = new Router();

app.get('/', async () => new Response('Hello, World!'));

export default {
  fetch(req) {
    return app.handler(req);
  }
} satisfies Deno.ServeDefaultExport;