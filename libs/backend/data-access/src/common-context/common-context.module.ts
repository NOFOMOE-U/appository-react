import { ContextModule, ContextService } from '@appository/backend/context-system';
import { Module } from '@nestjs/common';

@Module({
    providers: [ContextService],
    exports: [ContextService, ContextModule],
    imports: [ContextModule]
})
export class CommonContextModule {}
