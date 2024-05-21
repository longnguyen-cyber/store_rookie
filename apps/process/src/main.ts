import { NestFactory } from '@nestjs/core';
import { ProcessModule } from './process.module';

async function bootstrap() {
  const PORT = process.env.PROCESS || 3005;
  const app = await NestFactory.create(ProcessModule);
  await app.listen(PORT, () => {
    console.log(`Order service is running on http://localhost:${PORT}/graphql`);
  });
}
bootstrap();
