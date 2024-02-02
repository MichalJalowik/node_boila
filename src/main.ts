import { createApp } from './createApp';

async function bootstrap() {
  const app = await createApp({
    cors: true,
  });
  await app.listen(3000);
}
bootstrap();
