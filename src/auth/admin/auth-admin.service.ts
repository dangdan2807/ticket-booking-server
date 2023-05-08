import { Staff } from '../../database/entities';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from '../../enums';
import { EMAIL_REGEX, PHONE_REGEX } from '../../utils/regex.util';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { AdminLoginDto, AdminRegisterDto } from './dto';
import { SendOtpDto } from '../customer/dto';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './../../api/admin/admin.service';
import { MyMoment } from './../../utils';


@Injectable()
export class AuthAdminService {
  private configService = new ConfigService();
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly dataSource: DataSource,
  ) {}

  async updateStaffByAdminId(staffId: string, data: any) {
    return this.staffRepository.update({ id: staffId }, data);
  }

  async register(userId: string, dto: AdminRegisterDto) {
    const { phone, email, name, gender } = dto;
    if (!phone && !email) {
      throw new BadRequestException('EMAIL_OR_PHONE_REQUIRED');
    }
    if (phone) {
      if (!phone.match(PHONE_REGEX)) {
        throw new BadRequestException('INVALID_PHONE_NUMBER');
      }
    }
    if (email && !email.match(EMAIL_REGEX)) {
      throw new BadRequestException('INVALID_EMAIL');
    }

    if (!userId) {
      throw new BadRequestException('CREATOR_ID_REQUIRED');
    }

    const creator = await this.adminService.findOneById(userId);
    if (!creator) {
      throw new BadRequestException('CREATOR_NOT_FOUND');
    }
    if (!creator.isActive) {
      throw new BadRequestException('CREATOR_IS_INACTIVE');
    }

    const staffPhoneExist = await this.adminService.findOneByPhone(phone);
    const staffEmailExist = await this.adminService.findOneByEmail(email);
    if (staffPhoneExist || staffEmailExist) {
      throw new BadRequestException('STAFF_ALREADY_EXIST');
    }

    const queryRunner = await this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const passwordHashed = await this.authService.hashData(dto.password);

      const staffCred = new Staff();
      staffCred.password = passwordHashed;
      staffCred.fullName = name;
      staffCred.phone = phone;
      staffCred.email = email;
      staffCred.gender = gender;
      staffCred.createdBy = userId;
      staffCred.isActive = true;

      const staff = await this.staffRepository.save(staffCred);
      delete staff.createdAt;
      delete staff.updatedAt;
      delete staff.deletedAt;
      delete staff.createdBy;
      delete staff.updatedBy;
      delete staff.password;

      await queryRunner.commitTransaction();

      return staff;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async login(dto: AdminLoginDto) {
    const { email, phone } = dto;
    if (!email && !phone) {
      throw new BadRequestException('EMAIL_OR_PHONE_REQUIRED');
    }
    let staffExist: Staff;
    if (email) {
      staffExist = await this.adminService.findOneByEmail(email, {
        select: {
          password: true,
        },
      });
    } else if (phone) {
      staffExist = await this.adminService.findOneByPhone(phone, {
        select: {
          password: true,
        },
      });
    }
    if (!staffExist || !staffExist?.password) {
      throw new BadRequestException('INVALID_USERNAME_OR_PASSWORD');
    }
    if (!dto.password) {
      throw new BadRequestException('PASSWORD_IS_REQUIRED');
    }

    const isPasswordMatches = await this.authService.comparePassword(
      dto.password,
      staffExist.password,
    );
    if (!isPasswordMatches) {
      throw new BadRequestException('INVALID_USERNAME_OR_PASSWORD');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      const tokens = await this.authService.createTokens(
        staffExist,
        RoleEnum.STAFF,
      );

      await this.updateStaffByAdminId(staffExist.id, {
        refreshToken: tokens.refresh_token,
        accessToken: tokens.access_token,
        lastLogin: new Date(),
      });

      await queryRunner.commitTransaction();

      return tokens;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      await queryRunner.release();
    }
  }

  async logout(staffId: any) {
    return await this.updateStaffByAdminId(staffId, {
      refreshToken: null,
      accessToken: null,
    });
  }

  async refreshToken(refreshToken: string) {
    const staffExist = await this.adminService.findOneByRefreshToken(
      refreshToken,
    );
    if (!staffExist || !staffExist.refreshToken) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    const tokens = await this.authService.createTokens(
      staffExist,
      RoleEnum.STAFF,
    );

    await this.updateStaffByAdminId(staffExist.id, {
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
    });
    return tokens;
  }

  async sendOtp(dto: SendOtpDto) {
    const { oldEmail: email, phone: phone } = dto;
    let staff: Staff;
    if (email) {
      staff = await this.adminService.findOneByEmail(email);
    } else if (phone) {
      staff = await this.adminService.findOneByPhone(phone);
    } else {
      throw new BadRequestException('EMAIL_OR_PHONE_REQUIRED');
    }
    if (!staff) {
      throw new BadRequestException('USER_NOT_FOUND');
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000) + '';
    const otpExpiredTime = this.configService.get('OTP_EXPIRE_MINUTE');
    const otpExpired = new MyMoment().add(otpExpiredTime, 'minutes').toDate();

    const saveCustomer = await this.adminService.updateOtp(
      staff.id,
      otpCode,
      otpExpired,
    );
    if (!saveCustomer) {
      throw new BadRequestException('SEND_OTP_FAILED');
    }
    if (email) {
      await this.authService.sendEmailCodeOtp(email, otpCode, otpExpiredTime);
    } else {
      await this.authService.sendPhoneCodeOtp(phone, otpCode);
    }

    return {
      customer: {
        id: staff.id,
      },
      message: 'Gửi mã OTP thành công',
    };
  }
}
