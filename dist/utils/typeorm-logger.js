"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseLogger = void 0;
const common_1 = require("@nestjs/common");
class DatabaseLogger {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
    }
    logQuery(query, parameters) {
        this.logger.log({ message: 'Query', sql: query, params: parameters });
    }
    logQueryError(error, query, parameters) {
        let message;
        let stack;
        if (typeof error === 'string')
            message += error;
        else {
            message += error.message;
            stack = error.stack;
        }
        this.logger.log({ message, sql: query, params: parameters, stack });
    }
    logQuerySlow(time, query, parameters) {
        this.logger.log({
            message: 'Query Slow',
            time,
            sql: query,
            params: parameters,
        });
    }
    logSchemaBuild(message) {
        this.logger.log({ message: `Schema: ${message}` });
    }
    logMigration(message) {
        this.logger.log({ message: `Migration: ${message}` });
    }
    log(level, message) {
        let logger;
        switch (level) {
            case 'log':
                logger = this.logger.log;
                break;
            case 'info':
                logger = this.logger.verbose;
                break;
            case 'warn':
                logger = this.logger.warn;
                break;
        }
        logger(message);
    }
}
exports.DatabaseLogger = DatabaseLogger;
//# sourceMappingURL=typeorm-logger.js.map