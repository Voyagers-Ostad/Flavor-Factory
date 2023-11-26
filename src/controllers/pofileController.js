// controllers/profileController.js
module.exports = (req, res) => {
    res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  };
  