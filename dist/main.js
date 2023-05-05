"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const winston = require("winston");
const morgan = require("morgan");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(winston.format.prettyPrint(), winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('API')),
        }),
        cors: {
            origin: '*',
        },
    });
    const logger = new common_2.Logger();
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    const isDev = configService.get('NODE_ENV', 'production') === 'development';
    app.use(morgan(':remote-addr - :method :url :status', {
        stream: {
            write: (message) => logger.log(message.trim(), 'Request'),
        },
    }), (0, helmet_1.default)(isDev
        ? {
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginOpenerPolicy: false,
            crossOriginResourcePolicy: false,
        }
        : {}));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ticket book')
        .setDescription('The ticket API description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', bearerFormat: 'JWT' })
        .addBearerAuth({ type: 'http', bearerFormat: 'JWT' }, 'refresh')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT);
    logger.log(`listening at http://localhost:${PORT}/api`, 'Server');
}
bootstrap();
//# sourceMappingURL=main.js.map