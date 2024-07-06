const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/movie_poster_images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const UploadMovieImage = multer({ storage });

module.exports = UploadMovieImage;
