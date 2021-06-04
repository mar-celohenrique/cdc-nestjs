import { getConnection } from 'typeorm';

export async function findById(clazz: any, id: number, relations?: string[]): Promise<any> {
    return await getConnection()
        .getRepository(clazz)
        .findOneOrFail(id, { relations });
}
