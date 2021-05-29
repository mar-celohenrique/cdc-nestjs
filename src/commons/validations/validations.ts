import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueValueValidator } from './validators/unique-value.validator';

interface ValidationProperties {
    field: string;
    clazz: any;
}

export function UniqueValue(properties: ValidationProperties, validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
        registerDecorator({
            name: 'UniqueValue',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [properties.field, properties.clazz],
            options: validationOptions,
            validator: UniqueValueValidator,
        });
    };
}
