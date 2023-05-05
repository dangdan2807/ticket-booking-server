"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderId = void 0;
const shortId = require("shortid");
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
    const id = shortId.generate().replace(/[^A-Z0-9]/g, '');
    return `${year}${month}${day}${id}`;
}
exports.generateOrderId = generateOrderId;
//# sourceMappingURL=generation-id.util.js.map