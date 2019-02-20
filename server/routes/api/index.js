const router = require("express").Router();
const userRoutes = require("./users");

// Note routes
router.use("/users", userRoutes);

module.exports = router;
