const router = require('express').Router();
const equipmentController = require('../../controllers/equipmentController');

// Matches with "/api/notes"
router.route('/')
  .get(equipmentController.findAll)
  .post(equipmentController.create);

// Matches with "/api/notes/:id"
router
  .route('/:id')
  .get(equipmentController.findById)
  .put(equipmentController.update)
  .delete(equipmentController.remove);

module.exports = router;
