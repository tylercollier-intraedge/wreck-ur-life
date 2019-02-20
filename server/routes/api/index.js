const router = require("express").Router();
const userRoutes = require("./users");
const equipmentRoutes = require('./equipment');


// Note routes
router.use("/users", userRoutes);
router.use("/equipment", equipmentRoutes);

module.exports = router;
