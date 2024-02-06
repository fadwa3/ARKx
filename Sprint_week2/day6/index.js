const fs = require('fs');

const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');
const processFiles = require('./processFiles');

const filePath = 'file.txt';
const fileContent = 'Heyy, this is the content ...';
const files = ['file1.txt', 'file2.txt'];

(async () => {
  try {
    await processFiles(files);
    console.log('all files processed successfully');
    
    await writeFileAsync(filePath, fileContent);
    console.log('well done!');

    const data = await readFileAsync(filePath);
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});
