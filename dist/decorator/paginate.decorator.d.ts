export type Pagination = {
    skip?: number;
    take?: number;
    page?: number;
    pageSize?: number;
    total?: number;
};
export declare const GetPagination: (...dataOrPipes: unknown[]) => ParameterDecorator;
