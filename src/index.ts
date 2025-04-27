import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { userController } from './user/user.controller';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
// import { serve } from 'bun';
import { CookieStore, sessionMiddleware } from 'hono-sessions';
import {
  JwtTokenExpired,
  JwtTokenSignatureMismatched,
} from 'hono/utils/jwt/types';
import { UserData } from './user/user.model';
import { logger } from './providers/logging.providers';
import { authWeb } from './web/auth.web';
import { apiAuthMiddleware } from './middleware/user.middleware';
const store = new CookieStore();

type Variables = {
  userData: UserData;
};

const app = new Hono<{ Variables: Variables }>();

app.use(async (c, next) => {
  logger.info(`Request Url: ${c.req.url}`);
  return next();
});
app.use(
  '*',
  sessionMiddleware({
    store,
    encryptionKey: Bun.env.SESSION_ENCRYPTION_KEY,
    expireAfterSeconds: 900,
    cookieOptions: {
      path: '/',
      httpOnly: true,
    },
  })
);

app.get(
  '/public/*',
  serveStatic({
    root: './src/',
    onFound(path, c) {
      // c.header('Cache-Control', `public, immutable, max-age=31536000`);
    },
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);

app.get('/', async (c) => {
  return c.text('Welcome to IoT Server');
});
app.get('/private', apiAuthMiddleware, async (c) => {
  return c.text('Welcome to IoT Server');
});
app.get('/health', async (c) => {
  return c.text('Server Working');
});
app.route('/auth', authWeb);
app.route('/api/users/', userController);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      errors: err.message,
    });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      errors: err.message,
    });
  } else if (
    err instanceof JwtTokenExpired ||
    err instanceof JwtTokenSignatureMismatched
  ) {
    c.status(401);
    return c.json({
      errors:
        err instanceof JwtTokenExpired ? 'Token Expired' : 'Token Invalid',
    });
  } else {
    c.status(500);
    return c.json({
      errors: err.message,
    });
  }
});

export default {
  port: Number(Bun.env.PORT),
  fetch: app.fetch,
};
