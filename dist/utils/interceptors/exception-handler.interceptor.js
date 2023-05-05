"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandlerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const translate_util_1 = require("../translate.util");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const message_util_1 = require("../message.util");
const transform = (err) => {
    common_1.Logger.error(err);
    if (err instanceof common_1.HttpException) {
        const message = err.getResponse()['message'][0].split('.')[1];
        err['response']['error'] =
            translate_util_1.mappingTranslate[message || err.getResponse()['message'][0]];
        err['response']['code'] = message_util_1.MESS_CODE[err.message];
        err['response']['message'] = err['options']['description']
            ? err['options']['description']
            : translate_util_1.mappingTranslate[err.message];
        return err;
    }
    const newErr = new common_1.InternalServerErrorException(err.message);
    const response = newErr.getResponse();
    const error = response['error'];
    const message = response['message'];
    if (error === 'Internal Server Error') {
        newErr['response']['code'] = message_util_1.MESS_CODE.INTERNAL_SERVER_ERROR;
    }
    else {
        newErr['response']['code'] = message_util_1.MESS_CODE[message];
    }
    newErr.stack = err.stack;
    return newErr;
};
let ExceptionHandlerInterceptor = class ExceptionHandlerInterceptor {
    intercept(_context, next) {
        return next
            .handle()
            .pipe((0, operators_1.catchError)((err) => (0, rxjs_1.throwError)(() => transform(err))));
    }
};
ExceptionHandlerInterceptor = __decorate([
    (0, common_1.Injectable)()
], ExceptionHandlerInterceptor);
exports.ExceptionHandlerInterceptor = ExceptionHandlerInterceptor;
//# sourceMappingURL=exception-handler.interceptor.js.map