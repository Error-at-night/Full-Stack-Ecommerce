// const cron = require("node-cron")
// const { cloudinary } = require("../utils")
// const Product = require("../models/Product")

// const cleanupOrphanedImages = async () => {
//   try {
//     const products = await Product.find({}, "imageId")
//     const productImageIds = new Set(products.map((p) => p.imageId))

//     const { resources } = await cloudinary.api.resources({
//       type: "upload",
//       prefix: "ecommerce_uploads/",
//       max_results: 500
//     })

//     const orphaned = resources.filter((img) => !productImageIds.has(img.public_id))

//     for (const orphan of orphaned) {
//       await cloudinary.uploader.destroy(orphan.public_id)
//       console.log(`Deleted orphaned image: ${orphan.public_id}`)
//     }

//     console.log("Cleanup finished")
//   } catch (err) {
//     console.error("Error cleaning orphaned images:", err.message)
//   }
// }

// cron.schedule("0 0 * * *", cleanupOrphanedImages)