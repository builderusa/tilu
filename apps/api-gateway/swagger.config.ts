import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Tillu AI POS API')
    .setDescription('Next-Generation Human-Centered AI POS System for Food & Takeaways')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('orders', 'Order management')
    .addTag('menu', 'Menu management')
    .addTag('inventory', 'Inventory management')
    .addTag('customers', 'Customer management')
    .addTag('kitchen', 'Kitchen operations')
    .addTag('analytics', 'Analytics and reporting')
    .addTag('ai', 'AI-powered features')
    .addTag('campaigns', 'Marketing campaigns')
    .addTag('offers', 'Offers and promotions')
    .addTag('branches', 'Branch management')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
