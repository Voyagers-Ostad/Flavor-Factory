const TipsModel = require("../models/tipsModel");

//create
exports.createTips = (req, res) => {
  let reqBody = req.body;
  // console.log(reqBody);
  TipsModel.create(reqBody)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//read
exports.readTips = (req, res) => {
  TipsModel.find()
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//readOne
exports.readOneTips = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  let projection = "";
  TipsModel.findOne(query, projection)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//update
exports.updateTips = (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let query = { _id: id };
  let reqBody = req.body;
  TipsModel.updateOne(query, reqBody)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};

//delete

exports.deleteTips = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  TipsModel.deleteOne(query)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch((err) =>
      res.status(400).json({ status: "failed", data: err.message })
    );
};
