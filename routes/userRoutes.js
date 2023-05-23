const express = require("express");
const {allUsers, singleUser, editUser, deleteUser, createUserJobsHistory} =  require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//User Routes

router.get('/allUsers', isAuthenticated, isAdmin, allUsers);
router.get('/user/:id', isAuthenticated, singleUser);
router.put('/user/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

router.post('/user/jobhistory', isAuthenticated, createUserJobsHistory);

module.exports = router;