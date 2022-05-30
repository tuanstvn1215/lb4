// Uncomment these imports to begin using these cool features!
import {authenticate, TokenService} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject, service} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Certificate} from '../models/Certificate.model';
import {MyUserService} from '../services';

// import {inject} from '@loopback/core';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @service(MyUserService)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
  ) {}
  @post('/user/login')
  @response(200, {
    description: 'token',
    content: {
      'application/json': {schema: {token: 'string'}},
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Certificate),
        },
      },
    })
    body: Certificate,
  ) {
    const user = await this.userService.verifyCredentials(body);
    const userPofile = await this.userService.convertToUserProfile(user);
    console.log(userPofile);
    const token = await this.userService.generateToken(userPofile);

    return {token: token};
  }

  @authenticate('jwt')
  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }
}
//   @post('/signup', {
//     responses: {
//       '200': {
//         description: 'User',
//         content: {
//           'application/json': {
//             schema: {
//               'x-ts-type': User,
//             },
//           },
//         },
//       },
//     },
//   })
//   async signUp(
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(User, {
//             title: 'NewUser',
//           }),
//         },
//       },
//     })
//     user: User,
//   ): Promise<User> {
//     const password = await hash(user.password, await genSalt());
//     const savedUser = await this.userRepository.create(
//       _.omit(newUserRequest, 'password'),
//     );

//     await this.userRepository.userCredentials(savedUser.id).create({password});

//     return savedUser;
//   }
// }
// function CredentialsRequestBody(CredentialsRequestBody: any) {
//   throw new Error('Function not implemented.');
// }

// function NewUserRequest(
//   NewUserRequest: any,
//   arg1: {title: string},
// ):
//   | import('@loopback/rest').ReferenceObject
//   | import('@loopback/rest').SchemaObject
//   | undefined {
//   throw new Error('Function not implemented.');
// }
