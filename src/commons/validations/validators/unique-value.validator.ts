import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ name: 'UniqueValue', async: true })
export class UniqueValueValidator implements ValidatorConstraintInterface {
    async validate(value: number, args: ValidationArguments) {
        try {
            const [field, clazz] = args.constraints;

            const result = await getConnection()
                .createQueryBuilder()
                .select('entity.id')
                .from(clazz, 'entity')
                .where(`entity.${field} = :value`, { value })
                .getOne();

            return result == null;
        } catch (ex) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        const [field] = args.constraints;
        return `${field} value must be unique`;
    }
}
