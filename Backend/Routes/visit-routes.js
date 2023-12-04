const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const visitController = require('../Controllers/visit-controller')

router.get('/', visitController.getVisits)


router.post('/',
[check("userId").not().isEmpty(),
check("clinicalId").not().isEmpty()],
visitController.addVisit)

router.delete('/:vid', visitController.deleteVisit)

module.exports = router;