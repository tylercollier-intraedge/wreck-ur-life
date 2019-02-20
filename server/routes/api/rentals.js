const router = require('express').Router();
const rentalsController = require('../../controllers/rentalsController');

// Matches with "/api/rentals"
router.route('/api/rentals')
  .get(rentalsController.findAll)
  .post(rentalsController.create);

// Matches with "/api/rentals/:id"
router
  .route('/api/rentals/:id')
  .get(rentalsController.findById)
  .put(rentalsController.update)
  .delete(rentalsController.remove);

module.exports = router;