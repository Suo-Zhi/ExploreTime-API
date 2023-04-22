import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

// 两个参数的值是否相同
export function IsSame(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'IsSame', // 规则名
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    // 比较当前参数 和 该参数名_confirm 的值是否相同
                    return value === args.object[`${args.property}_confirm`];
                },
            },
        });
    };
}
