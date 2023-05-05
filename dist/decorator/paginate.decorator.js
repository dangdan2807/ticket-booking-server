"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPagination = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("./../utils");
exports.GetPagination = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const paginationParams = {
        skip: !(0, utils_1.toBoolean)(req.query.isAll) ? skip : undefined,
        take: !(0, utils_1.toBoolean)(req.query.isAll) ? take : undefined,
        page,
        pageSize,
    };
    return paginationParams;
}, [
    (target, key) => {
        (0, swagger_1.ApiQuery)({
            name: 'isAll',
            schema: { default: false, type: 'boolean' },
            required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        (0, swagger_1.ApiQuery)({
            name: 'page',
            schema: { default: 1, type: 'number', minimum: 1 },
            required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        (0, swagger_1.ApiQuery)({
            name: 'pageSize',
            schema: { default: 10, type: 'number', minimum: 0 },
            required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
    },
]);
//# sourceMappingURL=paginate.decorator.js.map