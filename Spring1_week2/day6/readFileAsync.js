//! readfile module 

const fs = require('fs');
function readFileAsync(filePath){
    return new Promise((resolve,reject)=>{
    fs.readFile(filePath,'utf8',(error,data)=>{
       if(data){
           resolve(data);
       }else{
          reject(error);
       }
    });
    });
   }
  
module.exports.readFileAsync = readFileAsync;
