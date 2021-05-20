require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKeyId = process.env.IAM_USER_KEY;
const secretAccessKey = process.env.IAM_USER_SECRET;

const s3 = new S3({ region, accessKeyId, secretAccessKey });

const awsController = {};

awsController.placeFile = async function (req, res, next) {
  console.log(req.body.item);
  next();
  // // body is body of file
  // // key is name of file
  // const uploadParams = {
  //   Bucket: bucketName,
  //   Body: 'Pls Work',
  //   Key: 'Bye.txt',
  // };
  // s3.upload(uploadParams, (err, data) => {
  //   if (err) console.log(err);
  //   else console.log(data);
  // });
  // res.send(200);
};
//Logz: maybe this is the right way to do this?
awsController.getFile = function (req, res, next) {
  console.log(req.params.key);
  s3.getFile(req.params.key) //maybe this will work? but we need to change our request path
    // i haven't looked at all into get file so i believe you. i just sort of finished the css file and am about to start on the components,
    //you mean about to start being able tosend components to s3?
    // yes and i thought that they were related to getting files.. and then realized that they are the exact opposite lol
    // should we do sending to s3 first?
    //i dunno.
    //tellyou the truth I woldn't be sad if we did it first thing tomorrow.....
    //Ithink I have old man energy tonight
    // i am glad you said that because i am also very tired lol first thing tomorrow is a ok with me
    //greats, lets leave this convo in the production version of the proj <-- yes
    //itll really confuse people.
    //sleep tight
    // you too!!!The
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(`error getting file at key  ${key} from s3, ${err}`);
    });
};

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
