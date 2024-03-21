const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

// router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard', dashboardController.dashboard);
router.get('/dashboard/item/:id', dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id', dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id', dashboardController.dashboarddeleteNote);
router.get('/dashboard/add', dashboardController.dashboardAddNote);
router.post('/dashboard/add', dashboardController.dashboardAddNoteSubmit);
router.get('/dashboard/search', dashboardController.dashboardSearch);
router.post('/dashboard/search', dashboardController.dashboardSearchSubmit);



module.exports = router;