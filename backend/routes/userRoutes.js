const express = require("express")
const router = express.Router()

const { showCurrentUserController } = require("../controllers/userController")
const { authenticateUser } = require("../middleware/authentication")

router.get("/show-me", authenticateUser, showCurrentUserController)

module.exports = router