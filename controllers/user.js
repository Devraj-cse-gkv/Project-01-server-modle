const User = require('../models/user')

async function handleAllUsers(req,res){
  const allDBUsers = await User.find({})
  res.setHeader('X-myName', 'Devraj');
  return res.json(allDBUsers);
}

async function handleGetUserById(req,res){
  const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.status(200).json(user)
}

async function handleUpdateUserById(req,res){
  const user = await User.findByIdAndUpdate(req.params.id, { lastName: "Kumari" })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.json(
      { Status: "User updated", user }
    )
}

async function handleDeleteUserById(req,res){
  const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.json(
      { Status: "User deleted", user }
    )
}

async function handleCreateUser(req,res){
  const body = req.body;

  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ Status: "Error", error: "Please provide all the required fields" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ Status: "User created", id: result._id });
}

module.exports = {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
}