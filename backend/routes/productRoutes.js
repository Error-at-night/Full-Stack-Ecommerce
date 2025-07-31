const express = require("express")
const router = express.Router()

const { createProductController } = require("../controllers/productController")
const { authenticateUser, authorizePermissions } = require("../middleware/authentication")

router.post("/create-product", authenticateUser, authorizePermissions("admin"), createProductController)

module.exports = router