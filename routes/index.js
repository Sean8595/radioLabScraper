var router = require("express").Router();
var logicRoutes = require("./apiRoutes");
var htmlRoutes = require("./htmlRoutes");

router.use("/articles", logicRoutes);
router.use("/", htmlRoutes);

module.exports = router;