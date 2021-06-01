import { QueryResultDTO } from '@/commons/dto/query-result.dto';

export class GenericResponseDTO<T> {
    content: QueryResultDTO<T>;
    message: string;

    constructor(content: QueryResultDTO<T>, message: string) {
        this.content = content;
        this.message = message;
    }
}
