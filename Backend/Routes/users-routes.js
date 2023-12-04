const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const usersController = require('../Controllers/users-controller');


router.get('/',usersController.getUsers)
router.get('/:uid', usersController.getUserById)
router.post('/lIn', usersController.logIn)
router.post('/', [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("address").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
   check("password").isLength({ min: 5 }, { max: 10 }),
   check("confirmPassword").isLength({ min: 5 }, { max: 10 }),
   check('tel').not().isEmpty()

],usersController.signUp)
router.patch('/:uid',
[
    check("firstName").not().isEmpty(),
check("lastName").not().isEmpty(),
check("address").not().isEmpty(),
check("email").normalizeEmail().isEmail(),
check("password").isLength({ min: 5 }, { max: 10 }),
check("confirmPassword").isLength({ min: 5 }, { max: 10 }),
check('tel').not().isEmpty()
]
,usersController.updateUser)
router.delete('/:uid',usersController.deleteUser)


module.exports = router;