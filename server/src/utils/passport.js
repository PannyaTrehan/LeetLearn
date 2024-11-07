const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../database");
const jwt = require("jsonwebtoken");

// console.log("Client ID:", process.env.ACCESS_SECRET);
// console.log("Client Secret:", process.env);

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/api/users/auth/google/callback", // Callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {

            const email = profile.emails[0].value;
            let user = await db.user.findOne({ where: { email } });

            if (!user) {
                user = await db.user.create({
                    user_id: profile.id,
                    email,
                    profile_pic: profile.photos[0].value,
                    join_date: new Date(),
                });
            }
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
));

module.exports = passport;