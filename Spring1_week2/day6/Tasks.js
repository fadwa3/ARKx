const fs = require('fs');
//! File Reading Function

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
//! File Writing Function

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

//! Processing function 

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

const filePath = 'file.txt';
const fileContent = 'Heyy, this is the content ...';
const files=['file1.txt','file2.txt'];
//*consuming process function
processFiles(files)
 .then(()=>{
    console.log('All files processed successfully');
 })
 .catch((error)=>{
    console.log('Error during processing:', error);
 })
//*consuming write function
writeFileAsync(filePath, fileContent)
  .then((result) => {
    console.log('well done !!');
  })
  .catch((error) => {
    console.log(error);
  });

//*consuming read function
readFileAsync(filePath)
.then((data)=>{
  
    console.log(data);
})
.catch((error)=>{
 console.log('something is wrong with the file' ,error);
});
