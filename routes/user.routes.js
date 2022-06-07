

///********OBJET ROUTER D'EXPRESS
const router = require('express').Router();
//const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

///*************ROUTES AUTH
router.post('/register', authController.signUp);//S'inscrire
router.post('/login', authController.signIn);//Se conncter
router.get('/logout', authController.logout);

///***********ROUTES USER */
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);


module.exports = router;