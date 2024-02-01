import { createApp } from './createApp';

async function bootstrap() {
  const app = await createApp({
    cors: true,
  });
  console.log('starting on port');
  await app.listen(3000);
}
bootstrap();
