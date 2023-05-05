"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericHttpConsumer = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const api = (baseUrl, token) => {
    const api = axios_1.default.create();
    api.defaults.baseURL = baseUrl;
    if (token)
        api.defaults.headers.common = { Authorization: `Bearer ${token}` };
    api.interceptors.response.use((res) => res, (err) => {
        var _a, _b;
        if (err.code === 'ECONNREFUSED')
            return Promise.reject(new common_1.ServiceUnavailableException());
        return Promise.reject(new common_1.HttpException((_a = err.response) === null || _a === void 0 ? void 0 : _a.data, (_b = err.response) === null || _b === void 0 ? void 0 : _b.status));
    });
    return api;
};
const genericHttpConsumer = () => {
    return api('');
};
exports.genericHttpConsumer = genericHttpConsumer;
//# sourceMappingURL=axios-client.js.map