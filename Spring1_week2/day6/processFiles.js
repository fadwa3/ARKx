//! Processing module 

function processFiles(files){
  const promises = [];
  for(let i=0;i<files.length;i++){
const promise =new Promise((resolve, reject)=>{
  let file=files[i];
  fs.readFile(file, (error, content) =>{
      if (error) {
         reject('there is an error reading the file ',file);
      }else{
       const newfpath=`copy_${file}`;
       const date = new Date();
       let timestamp = date.toString();
       const modicontent = `${content}\n${timestamp}\n`;
        writeFileAsync(newfpath, modicontent) 
          .then((result)=>{
              console.log(result);
              resolve();
          })
          .catch((error)=>{
              console.log('error in writing in the new file ',newfpath);
              reject(error);
          })
      }
  });
})
promises.push(promise);
}
return Promise.all(promises);
} 
module.exports.processFiles= processFiles;
