import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ name: 'ExistsValue', async: true })
export class ExistsValueValidator implements ValidatorConstraintInterface {
    async validate(value: number, args: ValidationArguments) {
        if (!value) {
            return true;
        }

        try {
            const [field, clazz] = args.constraints;

            const result = await getConnection()
                .createQueryBuilder()
                .select('entity.id')
                .from(clazz, 'entity')
                .where(`entity.${field} = :value`, { value })
                .getOne();

            return result != null;
        } catch (ex) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        const [field, clazz] = args.constraints;
        return `${clazz.name} ${field} value must exists on database`;
    }
}
