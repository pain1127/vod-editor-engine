const express = require('express');
const router = new express.Router();
const fs = require('fs');
// const ffmpeg = require('fluent-ffmpeg');
// const {exec} = require('child_process');
const ffmpeg = require('../middleware/ffmpeg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('test');
});

// /* test encoding */
// router.get('/transcoding', function(req, res, next) {
//   console.log('processing start');
//   const inputPath = '/users/skpark/downloads/test/a.mp4';
//   const outputPath = '/users/skpark/downloads/test/a_output.mxf';
//   if (fs.existsSync( inputPath )) {
//     ffmpeg(inputPath)
//         .videoCodec('libx264')
//         .videoBitrate('1000k')
//         .size('640x360')
//         .format('mxf')
//         .save(outputPath)
//         .on('end', function() {
//           console.log('Finished processing');
//         })
//         .on('error', function() {
//           console.log('error processing');
//         });
//   } else {
//     res.send('경로 없움');
//   }
// });

router.get('/mosaic', async function(req, res, next) {
  const input = '/users/skpark/downloads/test/dokev.mp4';
  const output = '/users/skpark/downloads/test/make';

  const result = await ffmpeg.makeHLS(input, output, 30);

  console.log(result);

  res.send(result);
});


/* test encoding */
router.get('/hls', async function(req, res, next) {
  const input = '/users/skpark/downloads/test/dokev.mp4';
  const output = '/users/skpark/downloads/test/make';

  const result = await ffmpeg.makeHLS(input, output, 30);

  console.log(result);

  res.send(result);
});

/* test encoding */
// router.get('/split', function(req, res, next) {
//   const inputPath = '/users/skpark/downloads/test/b.mp4';
//   const destinationPath = '/users/skpark/downloads/test/make';
//   console.log(process.pid);
//   if (!fs.existsSync(destinationPath)) {
//     fs.mkdirSync(destinationPath);
//   }

//   exec(`ffmpeg -i ${inputPath} -c copy -map 0 -segment_time 00:01:00 -f segment -reset_timestamps 1 ${destinationPath}/%08d.ts`, function(error, stdout, stderr) {
//     // console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//       // const re = /speed=\s*(\d+(?:.\d+)?)/g;
//       // const speedArray = stderr.match(re).map(function(x) {
//       //   return x.replace('speed=', '');
//       // });
//       console.log('exec error: ' + error);
//     }
//   });
//   // console.log('processing start');
//   // const inputPath = '/users/skpark/downloads/test/a.mp4';
//   // const outputPath = '/users/skpark/downloads/test/a_output.mxf';
//   // if (fs.existsSync( inputPath )) {
//   //   ffmpeg(inputPath)
//   //       .videoCodec('libx264')
//   //       .videoBitrate('1000k')
//   //       .size('640x360')
//   //       .format('ts')
//   //       .complexFilter([
//   //         {
//   //           filter: 'split', options: '3',
//   //           inputs: 'rescaled',
//   //         }]
//   //       )
//   //       .on('end', function() {
//   //         console.log('Finished processing');
//   //       })
//   //       .on('error', function() {
//   //         console.log('error processing');
//   //       });
//   // } else {
//   //   res.send('경로 없움');
//   // }
//   res.send('test');
// });

module.exports = router;
