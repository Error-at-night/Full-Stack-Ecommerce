const express = require("express")
const router = express.Router()

const { createReviewController, getAllReviewController, getSingleReviewController, updateReviewController, deleteReviewController } = require("../controllers/reviewController")

const { authenticateUser } = require("../middleware/authentication")

router.post("/", authenticateUser, createReviewController)
router.get("/", authenticateUser, getAllReviewController)
router.get("/:id", authenticateUser, getSingleReviewController)
router.patch("/:id", authenticateUser, updateReviewController)
router.delete("/:id", authenticateUser, deleteReviewController)

module.exports = router