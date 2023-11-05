const connection = require("../config/mongoDB");
const registardSchema = require("../schemas/registardSchemas");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const signupSchema = require("../validation/signupValidation");
const signin_schema = require("../validation/signinValidation");

const registard = async (req, res) => {
  const { value, error } = signupSchema.validate(req.body, {
    abortEarly: true, allowUnknown: true
  });

  if (error) {
    error.details.forEach((e) => {
      req.flash("errors", `${e.message}`);
    });
    return res.status(400).redirect("/signup");
  } else {
    let fullName = value.first_name;
    let emails = value.Email_id;
    let salt = genSaltSync(10);
    let passwords = hashSync(value.passwords, salt);

    let fileSize = !req.file ? "" : req.file.size;
    let filekb = (fileSize / 1024).toFixed(2);
    let size = null;
    if (filekb < 1024) {
      size = filekb + "KB";
    } else {
      size = (fileSize / (1024 * 1024)).toFixed(2) + "MB";
    }

    let profile_data = {
      file_name: !req.file ? req.body.choose_character : req.file.filename,
      file_size: !req.file ? "under 180kb" : size,
      file_path: !req.file ? "/src/character" : req.file.destination,
    };

    try {
      if (!req.session.user) {
        const results = new registardSchema({
          fullName: fullName,
          email_id: emails,
          password: passwords,
          profile_picture: [profile_data]
        });
        results.save()
        .then(() => {
          req.session.user = results;
          req.flash('sucess', 'You registared successfully');
          res.redirect("/dashboard");
          return;
          })
          .catch((e) => {
            if (e.code === 11000) {
              req.flash('errors', `"${e.keyValue.email_id}" is allready registerd, try with new Email-id`);
              return res.redirect("/signup");
            }else{
              console.log(e);
              req.flash('errors', "Somethings went worngs with server!!!");
              return res.redirect("/signup");
            }
          });
      }
    } catch (error) {
      console.log(error);
      req.flash('errors', "Somethings went worngs with server!!!");
      return res.redirect("/signup");
    }
  }
};

const login = async (req, res) => {
  try {
    const { value, error } = signin_schema.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      error.details.forEach((e) => {
        req.flash("errors", `${e.message}`);
        return res.status(400).redirect("/signin");
      });
    } else {
      let email = value.emails;
      let password = value.password;

      let userFind = await registardSchema.findOne({ email_id: email });

      if (userFind) {
        let compayre = compareSync(password, userFind.password);
        if (compayre) {
          req.session.user = userFind;
          req.flash(
            "sucess",`${req.session.user.fullName} welcome back to chat !`
          );
          return res.redirect("/dashboard");
        } else {
          req.flash("errors", "Passwords is incurrect, please try again");
          return res.redirect("/signin");
        }
      } else {
        req.flash('errors', 'No user found with this Email id & Passwords')
        return res.redirect("/signin");
      }
    }
  } catch (error) {
    console.log(error);
    res.flash('errors', 'Somethings went worng with server, please try again !')
    return res.status(406).redirect('/signin');
  }
};

//Update call.......
const updateUser = async (req,res)=>{
  let oldEmail = req.body.Oldemail;
  let newEmail = req.body.email;
  let fullName = req.body.name;
  let userEmail = req.body.userEmail;
  try {
    if (req.body.email && req.body.Oldemail) {
      let updateUser = await registardSchema.findOneAndUpdate({email_id: oldEmail}, {$set: { email_id: newEmail }});
      if (!updateUser) {
      return res.status(400).json({error: "Email id not valid or not match..."});
      } else {
       return res.status(200).json({message: "OTP updated..."});
      }
    }
    if (req.body.name && req.body.userEmail) {
      let updateName = await registardSchema.findOneAndUpdate({ email_id: userEmail }, { $set: { fullName: fullName }});
      if (!updateName) {
        return res.status(400).json({error: "User name not updated..."});
      } else {
        return res.status(200).json({message: "Name Updated..."})
      }
    }
  if (req.body.characterUrl) {
    let emailsIds = req.body.emailID;
    let characterData = {
      file_name: req.body.characterUrl,
      file_size: "under 180kb",
      file_path: "/src/character"
    }
    let updatedcharacter = await registardSchema.findOneAndUpdate({email_id: emailsIds}, { $set: { profile_picture: [characterData]}});
    if (!updatedcharacter) {
      return res.json({message: "User is invalid..."});
    } else {
      return res.status(200).json({message: "Updated successfully..."});
    }
  }
  if (req.file) {
    let emailsId2 = req.body.emailID;
    let fileSize = req.file.size;
    let filekb = (fileSize / 1024).toFixed(2);
    let size = null;
    if (filekb < 1024) {
      size = filekb + "KB";
    } else {
      size = (fileSize / (1024 * 1024)).toFixed(2) + "MB";
    }
    let ownCharacterData = {
      file_name: req.file.filename,
      file_size: size,
      file_path: req.file.destination,
    }
    let updatedcharacter = await registardSchema.findOneAndUpdate({email_id: emailsId2}, { $set: { profile_picture: [ownCharacterData]}});
    if (!updatedcharacter) {
      return res.json({message: "User is invalid..."});
    } else {
      return res.status(200).json({message: "Updated successfully..."});
    }
  }
  } catch (error) {
    return res.status(500).json({error: 'Server error...'});
  }
   
  
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    return res.redirect("/signin");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registard,
  login,
  updateUser,
  logout,
};
