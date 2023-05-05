"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const enums_1 = require("./../../enums");
const passport_jwt_1 = require("passport-jwt");
const auth_service_1 = require("../auth.service");
let AtStrategy = class AtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(authService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_ACCESS_SECRET_KEY'),
            passReqToCallback: true,
        });
        this.authService = authService;
    }
    async validate(req, payload) {
        const tokenRequest = req.headers['authorization'].replace('Bearer ', '');
        const user = await this.authService.validateUserByJwt(payload);
        if (!user)
            throw new common_1.UnauthorizedException('WRONG_CREDENTIALS');
        if (payload.type === enums_1.RoleEnum.CUSTOMER) {
            if (tokenRequest !== user.access_token)
                throw new common_1.UnauthorizedException('WRONG_CREDENTIALS');
        }
        return { id: user.id, email: user.email, type: payload.type };
    }
};
AtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, config_1.ConfigService])
], AtStrategy);
exports.AtStrategy = AtStrategy;
//# sourceMappingURL=at.strategies.js.map