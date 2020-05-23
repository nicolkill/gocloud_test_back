const postSubscriptions = (req, res) => {
  let data = req.body;

  console.log(data);

  // insert to dynamodb

  res.status(204);
  res.end();
};

module.exports = {
  postSubscriptions,
};
