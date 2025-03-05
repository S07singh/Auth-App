import passport from 'passport';

// Google OAuth Callback Controller
export const googleCallback = (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
        }
        if (!user) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=login_failed`);
            }
            
            // Successful authentication, redirect home
            return res.redirect(process.env.FRONTEND_URL);
        });
    })(req, res, next);
};