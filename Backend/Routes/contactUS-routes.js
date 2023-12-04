const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const contactUSController = require('../Controllers/contactUs-controller')

router.post('/',[
    [check("name").not().isEmpty(),
check("email").not().isEmpty(),
check("message").not().isEmpty()]
],
contactUSController.addContactUs)

router.get('/',contactUSController.getAllContactUS)

router.delete('/:cuid', contactUSController.deleteContactUs)


module.exports = router