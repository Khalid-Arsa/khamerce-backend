import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserInterface } from '../../../lib/interface/auth/index.interface';
import { User } from '../../../model/user.model';

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = {
          email,
          password,
        };
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// passport.use(
//   'login',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     },
//     async (email, password, done) => {
//       try {
//         const user:
//           | (UserInterface &
//               Required<{
//                 _id: string;
//               }>)
//           | null = await User.findByEmail(email);

//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }

//         // const validate: boolean = await user.isValidPassword(password);

//         // if (!validate) {
//         //   return done(null, false, { message: 'Wrong Password' });
//         // }

//         return done(null, user, { message: 'Logged in Successfully' });
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );

// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );

// passport.use(
//   'admin',
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         if (token) {
//           const user: LeanDocument<
//             UserDocumentInterface &
//               Required<{
//                 _id: string;
//               }>
//           > | null = await UserModel.findById(token.user._id).lean();

//           if (user?.role === 'super-admin') {
//             return done(null, token.user);
//           }
//           return done({
//             statusCode: 401,
//             message: 'Unauthorized',
//             success: false,
//           });
//         }
//         return done({
//           statusCode: 401,
//           message: 'Unauthorized',
//           success: false,
//         });
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );
