//! Reading Excel Files

const reader = require('xlsx') ;
try{
var file = reader.readFile('employee_data_.xlsx') ;
}catch(error){
    console.log('an error in reading the file !!');
}
const sheetname = file.SheetNames[0];
const sheet = file.Sheets[sheetname];

const Data = [];

//! Calculating Bonuses
let bonusPercentage;
let bonusAmount;
for(let i=2;i<22;i++){

const Id = sheet[`A${i}`].v;
const salery = sheet[`B${i}`].v;
    //* calculate the bonus percentage
    if(sheet[`B${i}`].v<50000){
      bonusPercentage=5;

    }else if(sheet[`B${i}`].v>50000 && sheet[`B${i}`].v<100000){
        bonusPercentage=7;

    }else if(sheet[`B${i}`].v>100000){
        bonusPercentage=1;
    }
    //* calculate the bonus amount
    bonusAmount=(bonusPercentage/100)*sheet[`B${i}`].v;

    //* pushing all the data in an array
    Data.push({Id,salery,bonusPercentage,bonusAmount});
}

//! now put all of that in a new excel file

//* methode 1 ---> methode of creating a brand new xlsx file
//start
// create a workbook 
const wbook = reader.utils.book_new();
// create a worksheet
const wsheet = reader.utils.aoa_to_sheet([]);
//add the header names
    wsheet[`A1`] = { v: 'employeeId' };
    wsheet[`B1`] = { v: 'salery'};
    wsheet[`C1`] = { v: 'bonusPercentage'};
    wsheet[`D1`] = { v: 'bonusAmount'};
// Add data from the Data array to the worksheet
Data.forEach((element, index) => {
    const rowIndex = index + 2; // Offset by 1 for headers
    wsheet[`A${rowIndex}`] = { v: element.Id };
    wsheet[`B${rowIndex}`] = { v: element.salery };
    wsheet[`C${rowIndex}`] = { v: element.bonusPercentage };
    wsheet[`D${rowIndex}`] = { v: element.bonusAmount.toFixed(2) };
});

//apending the worksheet to the workbook
reader.utils.book_append_sheet(wbook, wsheet,'sheet1');
wsheet['!ref'] = "A1:D21"
// write the wbook object to a excel file
reader.writeFile(wbook, 'newfile1.xlsx');
//end

//* methode 2 ---> methode of working with the existing copy of the file (workbook:file)
 // Start 
// let Asheet = file.Sheets.Sheet;

// Asheet.C1 =  { t: 's', v: 'bonusPercentage', h: 'bonusPercentage', w: 'bonusPercentage' };
// Asheet.D1 =  { t: 's', v: 'bonusAmount', h: 'bonusAmount', w: 'bonusAmount' };
// Asheet['!ref'] = "A1:D21"
// Data.forEach((element,i) => {
//     const rowI = i + 2;
//     Asheet[`C${rowI}`] = { t: 'n', v: element.bonusPercentage, w: ''+element.bonusPercentage };
//     Asheet[`D${rowI}`] = { t: 'n', v: element.bonusAmount, w: ''+ element.bonusAmount.toFixed(2)};
// });
// //* write the to a excel file
// reader.writeFile(file, 'newfile.xlsx');
 // End

