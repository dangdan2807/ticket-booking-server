"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoolean = void 0;
const toBoolean = (value) => {
    switch (typeof value) {
        case 'string':
            return ['true', '1'].includes(value.toLowerCase());
        case 'number':
            return Boolean(value);
        default:
            return Boolean(value);
    }
};
exports.toBoolean = toBoolean;
//# sourceMappingURL=to-boolean.js.map