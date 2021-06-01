import { getConnection } from 'typeorm';

export async function findById(clazz: any, id: number): Promise<any> {
    return await getConnection()
        .createQueryBuilder()
        .select('entity')
        .from(clazz, 'entity')
        .where('entity.id = :id', { id })
        .getOneOrFail();
}
