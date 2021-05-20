require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKeyId = process.env.IAM_USER_KEY;
const secretAccessKey = process.env.IAM_USER_SECRET;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

const awsController = {};

awsController.placeFile = async function (req, res, next) {
  // body is body of file
  // key is name of file
  const uploadParams = {
    Bucket: bucketName,
    Body: 'Pls Work',
    Key: 'Bye.txt',
  };

  s3.upload(uploadParams, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });

  res.send(200);
};

awsController.getFile = function (req, res, next) {};

module.exports = awsController;
//   });
// }

// module.exports = (app) => {
//   // The following is an example of making file upload with additional body
//   // parameters.
//   // To make a call with PostMan
//   // Don't put any headers (content-type)
//   // Under body:
//   // check form-data
//   // Put the body with "element1": "test", "element2": image file

//   app.post('/api/upload', function (req, res, next) {
//     // This grabs the additional parameters so in this case passing in
//     // "element1" with a value.
//     const element1 = req.body.element1;

//     var busboy = new Busboy({ headers: req.headers });

//     // The file upload has completed
//     busboy.on('finish', function () {
//       console.log('Upload finished');

//       // Your files are stored in req.files. In this case,
//       // you only have one and it's req.files.element2:
//       // This returns:
//       // {
//       //    element2: {
//       //      data: ...contents of the file...,
//       //      name: 'Example.jpg',
//       //      encoding: '7bit',
//       //      mimetype: 'image/png',
//       //      truncated: false,
//       //      size: 959480
//       //    }
//       // }

//       // Grabs your file object from the request.
//       const file = req.files.element2;
//       console.log(file);

//       // Begins the upload to the AWS S3
//       uploadToS3(file);
//     });

//     req.pipe(busboy);
//   });
