import upload from "../middleware/uploadMiddleware.js";

router.post(
    "/",
    protect,
    upload.single("image"),
    createAirReport
);