const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single user by ID
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a user by ID
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove user by ID
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((user) => {
        if (!user) return res.status(404).json({ message: 'No user found' });
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User and thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  // POST to add a friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
