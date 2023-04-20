import { Module } from '@nestjs/common';
import { ContextModule } from '../context/context.module';
import { ContextService } from '../context/context.service';

@Module({
    providers: [ContextService],
    exports: [ContextService, ContextModule],
    imports: [ContextModule]
})
export class CommonContextModule {}
