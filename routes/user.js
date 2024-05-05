const express = require('express');
const {handleAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser} = require('../controllers/user')

const router = express.Router();

router.route('/')
.get(handleAllUsers)
.post(handleCreateUser)


router.route('/:id')
  .get(handleGetUserById)
  .delete(handleDeleteUserById)
  .patch(handleUpdateUserById)

module.exports = router;