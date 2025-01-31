const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          password: 'N/A' // Ajouter un mot de passe par défaut pour éviter les erreurs de validation
        });
        console.log("usersave", user);
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback",
    includeEmail: true // Assurez-vous que l'email est inclus dans le profil
  },
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ twitterId: profile.id });
      if (!user) {
        user = new User({
          twitterId: profile.id,
          firstname: profile.displayName.split(' ')[0],
          lastname: profile.displayName.split(' ')[1] || '',
          email: profile.emails[0].value,
          password: 'N/A' // Ajouter un mot de passe par défaut pour éviter les erreurs de validation
        });
        console.log("usersave", user);
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = new User({
          githubId: profile.id,
          firstname: profile.username,
          lastname: '',
          email: profile.emails[0].value,
          password: 'N/A' // Ajouter un mot de passe par défaut pour éviter les erreurs de validation
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});