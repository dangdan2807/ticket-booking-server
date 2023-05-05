"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const message_util_1 = require("../message.util");
const transform = (data) => {
    const statusCode = common_1.HttpStatus.OK;
    let message = common_1.HttpStatus[common_1.HttpStatus.OK];
    const code = message_util_1.MESS_CODE.SUCCESS;
    if (typeof data === 'string') {
        return { statusCode, message: data, code };
    }
    if ((data === null || data === void 0 ? void 0 : data['message']) && typeof data['message'] === 'string') {
        message = data['message'];
        delete data['message'];
        return { statusCode, message };
    }
    let pagination = {};
    if (data === null || data === void 0 ? void 0 : data['pagination']) {
        const totalPage = (data === null || data === void 0 ? void 0 : data['total']) /
            ((data === null || data === void 0 ? void 0 : data['pagination']['take'])
                ? data === null || data === void 0 ? void 0 : data['pagination']['take']
                : data === null || data === void 0 ? void 0 : data['pagination']['pageSize']);
        const lastPage = Math.floor(totalPage) < totalPage
            ? Math.floor(totalPage) + 1
            : Math.floor(totalPage);
        pagination = {
            page: data === null || data === void 0 ? void 0 : data['pagination']['page'],
            pageSize: data === null || data === void 0 ? void 0 : data['pagination']['pageSize'],
            lastPage,
            total: data === null || data === void 0 ? void 0 : data['total'],
        };
    }
    return {
        statusCode,
        message,
        code,
        pagination: (data === null || data === void 0 ? void 0 : data['pagination']) ? pagination : undefined,
        data: (data === null || data === void 0 ? void 0 : data['dataResult']) ? data['dataResult'] : data,
    };
};
let TransformResponseInterceptor = class TransformResponseInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, operators_1.map)(transform));
    }
};
TransformResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformResponseInterceptor);
exports.TransformResponseInterceptor = TransformResponseInterceptor;
//# sourceMappingURL=transform-response.interceptor.js.map