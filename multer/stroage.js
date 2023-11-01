const multer = require("multer");

const storage = new multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: async (req, file, cb) => {
    try {
      let current = new Date();
      let cDate =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      let cTime =
        current.getHours() +
        "-" +
        current.getMinutes() +
        "-" +
        current.getSeconds();
      let dateTime = cDate + "_" + cTime;
      const fileName = `${dateTime}_${req.body.first_name}_${file.originalname}`;
      cb(null, fileName);
    } catch (error) {
      console.log(error);
    }
  },
});

module.exports = { storage };
