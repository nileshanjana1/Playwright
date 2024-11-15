const ExcelJs = require("exceljs");
const {test, expect} = require("@playwright/test");

async function writeExcelTest(searchText, replacedText, filePath) {
  
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output =  await readExcel(worksheet,searchText);
  //Fetch row 3 column 2 i.e. Apple
  const cell = worksheet.getCell(output.row, output.column);
  // Replace Apple with Iphone
  cell.value = replacedText //"Iphone";
  //Write to file
  workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        console.log(rowNumber);
        console.log(colNumber);
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}
writeExcelTest("Apple", "Banana", "C:\\Users\\nanjana\\Downloads\\exceldownload.xlsx");

//E2E Test 
test("Upload download excel validation", async ({page}) => {
  const textSearch = "Banana";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  const downloadPromise = await page.waitForEvent('download');
  //Download excel
  await page.getByRole('button', {name: 'Download'}).click();
  downloadPromise;
  //Modify data for downloaded file
  await writeExcelTest("Apple", "Banana", "C:\\Users\\nanjana\\Downloads\\download.xlsx");
  //Upload file again
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("C:\\Users\\nanjana\\Downloads\\download.xlsx");
  const textLocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({has: textLocator});
  expect(desiredRow.locator("#cell-4-undefined")).toContainText(searchText);
})