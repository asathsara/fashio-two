import passport from 'passport';
import jwt from 'jsonwebtoken';

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (req, res, next) => {
  passport.authenticate(
    'google',
    { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: false },
    (err, user) => {
      if (err || !user) {
        console.error('Google auth failed:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=unauthorized`);
      }

      // Create JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Redirect to frontend home
      res.redirect(`${process.env.FRONTEND_URL}/`);
    }
  )(req, res, next);
};
