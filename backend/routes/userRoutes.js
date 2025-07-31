const express = require("express")
const router = express.Router()

const { showCurrentUserController, getAllUserController, getSingleUserController, updateUserController, updateUserPasswordController } = require("../controllers/userController")
const { authenticateUser, authorizePermissions } = require("../middleware/authentication")

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUserController)
router.get("/show-me", authenticateUser, showCurrentUserController)
router.patch("/update-user", authenticateUser, updateUserController)
router.patch("/update-user-password", authenticateUser, updateUserPasswordController)
router.get("/:id", authenticateUser, getSingleUserController)

module.exports = router