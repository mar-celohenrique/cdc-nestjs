import { BaseQueryParametersDto } from '@/commons/dto/base-query-parameters.dto';
import { QueryResultDTO } from '@/commons/dto/query-result.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';

export abstract class GenericRepository<T> extends Repository<T> {
    async findAll(queryDto: BaseQueryParametersDto): Promise<QueryResultDTO<T>> {
        return this.findAllByQuery(queryDto, this.createQueryBuilder());
    }

    async findAllByQuery(queryDto: BaseQueryParametersDto, query: SelectQueryBuilder<T>): Promise<QueryResultDTO<T>> {
        queryDto.page = queryDto.page < 1 || !queryDto.page ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 10 || !queryDto.limit ? 10 : queryDto.limit;

        query.skip((queryDto.page - 1) * queryDto.limit);
        query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.stringify(queryDto.sort) : undefined);

        const [result, total] = await query.getManyAndCount();
        return {
            result,
            total,
        };
    }
}
