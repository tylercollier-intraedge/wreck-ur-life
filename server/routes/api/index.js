const router = require("express").Router();
const userRoutes = require("./users");
const equipmentRoutes = require('./equipment');
const rentalRoutes = require('./rental');

// Note routes
router.use("/users", userRoutes);
router.use("/equipments", equipmentRoutes);
router.use('/rentals', rentalRoutes)
module.exports = router;
