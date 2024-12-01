const express = require('express');

const topicController = require('../controllers/topicController');

const { validateBodyDataName, validateParamId } = require('../midelwares/topicMw');

const router = express.Router();

router.get('/',         topicController.getAll);
router.post('/',        validateBodyDataName,   topicController.create);
router.put('/',         validateBodyDataName,   topicController.update);
router.get('/:id',      validateParamId,        topicController.get);
router.delete('/:id',   validateParamId,        topicController.delete);

module.exports = router;