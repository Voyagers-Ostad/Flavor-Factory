const BlogsModel = require("../models/BlogsModel");

//create
exports.createPost = (req, res) => {
  let reqBody = req.body;
  // console.log(reqBody);
  BlogsModel.create(reqBody)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//read
exports.readPost = (req, res) => {
  BlogsModel.find()
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//readOne
exports.readOnePost = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  let projection = "";
  BlogsModel.findOne(query, projection)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//update
exports.updatePost = (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let query = { _id: id };
  let reqBody = req.body;
  BlogsModel.updateOne(query, reqBody)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//delete

exports.deletePost = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  BlogsModel.deleteOne(query)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};
