import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        // 进入拦截器,处理请求数据
        const request = context.switchToHttp().getRequest() as Request;
        const startTime = Date.now();
        // 离开拦截器,进入控制器,开始处理请求
        return next.handle().pipe(
            map((data) => {
                // 请求结束,离开控制器,进入拦截器处理响应结果
                const endTime = Date.now();
                new Logger().log(`TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method}`);
                // 响应数据是否存在元信息,存在原样返回,反之用data包裹
                return data?.meta ? data : { data };
            }),
        );
    }
}
