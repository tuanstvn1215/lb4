import {UserService} from '@loopback/authentication';
import {JWTService} from '@loopback/authentication-jwt';
import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {Certificate} from '../models/Certificate.model';
import {UserRepository} from '../repositories';

export class MyUserService implements UserService<User, Certificate> {
  constructor(
    @service(JWTService) private jwtService: JWTService,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) /* Add @inject to inject parameters */ {}
  async verifyCredentials(certificate: Certificate): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {username: certificate.username},
    });

    if (user)
      if (user.password == certificate.password) {
        return user;
      }
    throw new HttpErrors.Unauthorized('sai thong tin');
  }

  async verify(username: string, password: string) {}

  async createNewUser(user: User) {
    return this.userRepository.create(user);
  }

  async checkUser(user: User) {
    return this.userRepository.create(user);
  }
  async generateToken(userprofile: UserProfile) {
    return this.jwtService.generateToken(userprofile);
  }
  convertToUserProfile(user: User): UserProfile {
    if (user.id) {
      return {
        [securityId]: user.id.toString(),
        name: user.username,
        id: user.id,
      };
    } else {
      throw new HttpErrors.Unauthorized('loi get UserProfile');
    }
  }
}

/*
 * Add service methods here
 */
