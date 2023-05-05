"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Role = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("./../auth/guards");
exports.ROLES_KEY = 'roles';
const Role = (role) => (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.ROLES_KEY, { role }), (0, common_1.UseGuards)(guards_1.RolesGuard));
exports.Role = Role;
const Roles = (...roles) => (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.ROLES_KEY, roles), (0, common_1.UseGuards)(guards_1.RolesGuard));
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map