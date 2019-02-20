const router = require('express').Router();
const equipmentController = require('../../controllers/equipmentController');

// Matches with "/api/notes"
router.route('/')
  .get(notesController.findAll)
  .post(notesController.create);

// Matches with "/api/notes/:id"
router
  .route('/:id')
  .get(notesController.findById)
  .put(notesController.update)
  .delete(notesController.remove);

module.exports = router;
