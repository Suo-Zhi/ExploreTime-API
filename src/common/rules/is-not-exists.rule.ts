import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// 传入的数据在该表该字段中是否不存在
export function IsNotExists(
    tableName: string, // 表名
    validationOptions?: ValidationOptions,
) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'IsNotExists', // 规则名
            target: object.constructor,
            propertyName: propertyName,
            constraints: [tableName],
            options: validationOptions,
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    // 自定义验证规则
                    const prisma = new PrismaClient();
                    const res = await prisma[tableName].findFirst({
                        where: {
                            // 指定字段中是否存在该数据
                            [args.property]: value,
                        },
                    });
                    return !Boolean(res);
                },
            },
        });
    };
}
