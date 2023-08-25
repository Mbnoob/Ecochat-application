const isLogout = (req,res,next)=>{
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        next();
    }
  }

const isLogin = (req,res, next)=>{
    if (req.session.user) {
        next();
    } else {
        res.redirect('/signin');
    }
  }

  module.exports = {
    isLogout,
    isLogin
  }