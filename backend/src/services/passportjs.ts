import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
} from "passport-google-oauth20";
import { type VerifyCallback } from "passport-oauth2";
import { User } from "../modules/user.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/api/v1/auth/google/callback`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        const email = profile.emails?.[0]?.value;
        if (!user) {
          if (!email) {
            return done(new Error("Email is required for Google login"));
          }
          // Create user from Google profile and mark as verified
          user = await User.create({
            googleId: profile.id,
            email,
            firstName:
              profile.name?.givenName ||
              profile.displayName?.split(" ")[0] ||
              "Unknown",
            lastName:
              profile.name?.familyName ||
              profile.displayName?.split(" ").slice(1).join(" ") ||
              "Unknown",
            password: "google_oauth_placeholder",
            isVerified: true,
            verificationToken: null,
            verificationTokenExpires: null,
          });
        } else if (!user.isVerified) {
          // If an existing Google user isn't marked verified, ensure it's set
          user.isVerified = true;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    },
  ),
);

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser((id: string, done) => done(null, id));
