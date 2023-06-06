import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";
import { config } from "../../../config";
import { UserInterface } from "../../../lib/interface/user.interface";
import UserModel from "../../../model/user.model";

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user: UserInterface | null = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

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
