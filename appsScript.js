const sheetName = 'All Students'
const scriptProp = PropertiesService.getScriptProperties()
var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
var sheet = doc.getSheetByName(sheetName)

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}


function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)


  try {
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1

    const newRow = headers.map(function (header) {
      return header === 'Date' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }


  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }


  finally {
    lock.releaseLock()
  }
}

var SORT_COLUMN_INDEX = 1;
var ASCENDING = true;
var NUMBER_OF_HEADER_ROWS = 1;

let aptSpreadsheet = SpreadsheetApp.openById('exampleSpreadsheetID')
SpreadsheetApp.setActiveSpreadsheet(aptSpreadsheet)
let aptSheet = SpreadsheetApp.getActive().getSheetByName("Appointment #s")

function autoSort() {
  appointmentSheet = SpreadsheetApp.setActiveSheet(aptSpreadsheet.getSheetByName('Appointment #s'))
  Logger.log(appointmentSheet)
  var range = appointmentSheet.getDataRange();
  if (NUMBER_OF_HEADER_ROWS > 0) {
    aptRange = range.offset(NUMBER_OF_HEADER_ROWS, 0);
  }

  range.sort({
    column: SORT_COLUMN_INDEX,
    ascending: ASCENDING
  });
}

function removeDuplicates() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("All Students")
  Logger.log(sheet)
  const data = sheet.getDataRange().getValues()
  let numRows = sheet.getDataRange().getNumRows()
  const uniqueData = {}
  let dlNumbers = sheet.getRange(2, 3, numRows, 1).getValues().flat()
  let dlNumbersArray = Object.values(dlNumbers)
  let uniqueDLNumbers = [...new Set(dlNumbersArray)]

  for (let row of data) {
    const key = row[2]
    uniqueData[key] = row
  }


  sheet.clearContents();
  const newData = Object.values(uniqueData)
  Logger.log(newData)
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData)
}

function filterRows() {
  const currentStudentsSheet = SpreadsheetApp.getActive().getSheetByName("Current Students")
  var currentDataLength = sheet.getDataRange().getValues().length
  var calendar = CalendarApp.getCalendarById("example@gmail.com")
  //   

  let startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() + (1 - startOfWeek.getDay()))

  let endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 4)

  let endOfMonth = new Date(startOfWeek)
  endOfMonth.setDate(endOfMonth.getDate() + 31)

  let events = calendar.getEvents(startOfWeek, endOfMonth)

  //
  for (var x = 2; x <= currentDataLength; x++) {
    var currentData = sheet.getDataRange()
    let gradDate = sheet.getDataRange().getCell(x, [8])
    let dlNumber = sheet.getDataRange().getCell(x, [3]).getValue()

    if (gradDate.isBlank()) continue;
      for (var y = 0; y < events.length; y++) {
        if (events[y].getDescription().includes(dlNumber)) {
        events[y].setColor(CalendarApp.EventColor.PALE_GREEN)
        currentStudentsSheet.hideRows(x)
        } else continue;
      }
  
    
  }
}