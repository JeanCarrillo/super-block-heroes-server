// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
// // import { jwtConstants } from './constants';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//  constructor(private readonly authService: AuthService) {
//    super({
//      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//      ignoreExpiration: false,
//     //  secretOrKey: jwtConstants.secret,
//      secretOrKey: 'jwtConstants.secret',

//    });
//  }
// //  async validate(email: string) {
// //    const userFound = await this.authService.validate(email);
// //    if (!userFound) {
// //      throw new UnauthorizedException();
// //    }
// //    return userFound;
// //  }
// }