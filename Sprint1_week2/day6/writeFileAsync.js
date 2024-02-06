//! writefile module 

const fs = require('fs');
function writeFileAsync(filePath, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (error) => {
      if (!error) {
          resolve('File written successfully.');
        } else {
      reject('heyy something is not right ');
        }
      });
    });
  }
  module.exports.writefile = writeFileAsync;
