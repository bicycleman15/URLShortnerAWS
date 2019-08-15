const express = require("express");
const router = express.Router();
var AWS = require("aws-sdk")

const db = new AWS.DynamoDB.DocumentClient({
  accessKeyId: "AKIAICC6VB2VUFY3OELQ",
  secretAccessKey: "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",
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

//tester get route
router.get("/:code",(req, res) => {
  const scanparams = {
    TableName: "URLShortner",
    Key: {
      ShortURL : req.params.code
    }
  };
  db.get(scanparams , (err , data ) => {
    if(err) {
      console.log(err)
    }
    else {
      if(isEmpty(data)) {
        return res.json("Not A Valid URL")
      }
      return res.redirect(data.Item.OriginalURL)
    }
  })
});

module.exports = router;
