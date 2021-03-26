'use strict';

const {exec} = require('child_process');
const fs = require('fs');

/**
 * HLS 생성 (파일 split, m3u8 생성)
 * @function
 * @name post profile/update
 * @memberof profile
 */

const makeHLS = async (input, output, hlsSegmentTime) => {
  try {
    // 경로 없을시에 경로 생성 진행
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }
    // ffmpeg transcoding
    exec(`ffmpeg -i ${input} -b:v 1M -g 60 -hls_time ${hlsSegmentTime} -hls_list_size 0 ${output}/output.m3u8`, function(error, stdout, stderr) {
      // console.log('stdout: ' + stdout);
      // console.log('stderr: ' + stderr);
      if (error !== null) {
        // const re = /speed=\s*(\d+(?:.\d+)?)/g;
        // const speedArray = stderr.match(re).map(function(x) {
        //   return x.replace('speed=', '');
        // });
        console.log('exec error: ' + error);
      }

      return stderr;
    });
  } catch (error) {
    return error;
  }
};

module.exports = {makeHLS};
