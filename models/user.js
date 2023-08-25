const connection = require("../config/mongoDB");
const registardSchema = require("../schemas/registardSchemas");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const registard = async (req, res) => {
  let fullName = req.body.first_name;
  let emails = req.body.Email_id;
  let salt = genSaltSync(10);
  let passwords = hashSync(req.body.passwords, salt);


  try {
    if (!req.session.user) {
      const results = new registardSchema({
        fullName: fullName,
        email_id: emails,
        password: passwords
      });
      req.session.user = results;
      results.save()
        .then(() => {
          return res.redirect("/dashboard");
        })
        .catch((e) => {
          console.log(e);
          return res.redirect("/signup");
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    let email = req.body.emails;
    let password = req.body.password;

    let userFind = await registardSchema.findOne({ email_id: email });

    if (userFind) {
      let compayre = compareSync(password, userFind.password);
      if (compayre) {
        req.session.user = userFind;
         res.redirect("/dashboard");
      } else {
         res.redirect("/signin");
      }
    
    } else {
      return res.redirect("/signin");
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/signin')
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
  registard,
  login,
  logout
};
