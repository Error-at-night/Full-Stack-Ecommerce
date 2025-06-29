const express = require("express")
const router = express.Router()

const { showCurrentUserController, getAllUserController, getSingleUserController } = require("../controllers/userController")
const { authenticateUser, authorizePermissions } = require("../middleware/authentication")

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUserController)
router.get("/show-me", authenticateUser, showCurrentUserController)
router.get("/:id", authenticateUser, getSingleUserController)

module.exports = router