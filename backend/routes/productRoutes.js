const express = require("express")
const router = express.Router()

const { createProductController, getAllProductsController, getSingleProductController, updateProductController, deleteProductController, uploadImageController } = require("../controllers/productController")
const { authenticateUser, authorizePermissions } = require("../middleware/authentication")
const upload = require("../middleware/multer")

router.post("/", authenticateUser, authorizePermissions("admin"), createProductController)
router.get("/", authenticateUser, getAllProductsController)
router.post("/upload-image", authenticateUser, authorizePermissions("admin"), upload.single("image"), uploadImageController)
router.get("/:id", authenticateUser, getSingleProductController)
router.patch("/:id", authenticateUser, authorizePermissions("admin"), updateProductController)
router.delete("/:id", authenticateUser, authorizePermissions("admin"), deleteProductController)

module.exports = router