const express = require('express');

const topicController = require('../controllers/topicController');
const priceController = require('../controllers/priceController');

const { validateBodyDataTopic, validateParamId } = require('../midelwares/topicMw');

const router = express.Router();

router.get('/',         topicController.getAll);
router.post('/',        validateBodyDataTopic,   topicController.create);
router.put('/',         validateBodyDataTopic,   topicController.update);
router.get('/:id',      validateParamId,         topicController.get);
router.delete('/:id',   validateParamId,         topicController.delete);

router.get('/:id/price',   validateParamId, priceController.history);
router.post('/:id/price',  validateParamId, priceController.create);

module.exports = router;