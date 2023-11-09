import { Module } from '@nestjs/common';
import { ApiController } from './api-controller'; // Import your API controller
import { ApiService } from './api-service'; // Import your API service

@Module({
  controllers: [ApiController], // Include your API controller
  providers: [ApiService], // Include your API service
  exports: [ApiService], // Export any service that needs to be used in other modules
})
export class MakeApiModule {}
