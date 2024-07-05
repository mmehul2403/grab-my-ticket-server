const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MovieController");
const uploadMovieImage = require("../middleware/UploadMovieImage");

router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.get("/:id", movieController.getMovie);
router.get("/", movieController.getAllMovies);
router.delete("/:id", movieController.deleteMovie);

router.post(
  "/",
  uploadMovieImage.single("banner"),
  movieController.createMovie
);
router.put(
  "/:id",
  uploadMovieImage.single("banner"),
  movieController.updateMovie
);

module.exports = router;
