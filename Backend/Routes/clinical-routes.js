const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const clinicalController = require('../Controllers/clinical-controller')



router.get('/',clinicalController.getClinicals)

router.get('/:cid', clinicalController.getClinicalById)

router.post('/',
[check("name").not().isEmpty(),
check("address").not().isEmpty(),
check('nTel').not().isEmpty()],
clinicalController.addClinical)

router.delete('/:cid',clinicalController.deleteClinical)

router.patch('/:cid',
[check("name").not().isEmpty(),
check("address").not().isEmpty(),
check('nTel').not().isEmpty()]
,clinicalController.updateClinical)


module.exports = router;