const router = require('express').Router();
const rentalController = require('../../controllers/rentalController');
// Matches with "/api/notes"
router.route('/')
  .get(rentalController.findAll)
  .post(rentalController.create);

// Matches with "/api/notes/:id"
router
  .route('/:id')
  .get(rentalController.findById)
  .put(rentalController.update)
  .delete(rentalController.remove);

  
// Find by user._id
// Matches with "/api/rentals/findby/user"

router
.route('/findby/user')
  .post(rentalController.findByUser);

// Find by user_id
router
.route('/findby/customer/:id')
  .get(rentalController.findByCustomer);
// Find by equipment_id
router
.route('/findby/equipment/:id')
  .get(rentalController.findByEquipment);

router
  .route('/findby/currentlyout')
    .get(rentalController.findCurrentlyOut);

router
  .route('/findby/date')
    .post(rentalController.availableByDay);
router
  .route('/findby/date/:date')
    .get(rentalController.availableByDayGet);
module.exports = router;
