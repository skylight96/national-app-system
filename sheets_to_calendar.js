const sheetName = 'Current Students'

function createCalendarEvents() {
  //locates spreadsheet with url and sets as active spreadsheet
  let ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/exampleSpreadsheetURL")
  SpreadsheetApp.setActiveSpreadsheet(ss)

  //retrieve active spreadsheet
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()

  //getting the current doc and settinng the sheet
  const doc = SpreadsheetApp.openById(activeSpreadsheet.getId())
  let sheet = doc.getSheetByName("Current Students")

  //grab the rows from the excel sheet 
  var rows = SpreadsheetApp.Dimension.ROWS;
  // Get the calendar
  var calendar = CalendarApp.getCalendarById("example@gmail.com");

  let numRows = sheet.getDataRange().getNumRows();

  let startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() + (1 - startOfWeek.getDay()))

  let endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 4)

  let endOfMonth = new Date(startOfWeek)
  endOfMonth.setDate(endOfMonth.getDate() + 31)

  let events = calendar.getEvents(startOfWeek, endOfMonth)

  let lastAppointment = events.filter(e => {
    return e.getStartTime().getDay() !== 0 && e.getStartTime().getDay() !== 6
  }) 

  let lastAppointmentDate = lastAppointment[lastAppointment.length - 1].getStartTime()

  let aptDay = new Date(lastAppointmentDate)
  aptDay.setDate(aptDay.getDate() + (7 - aptDay.getDay()))
  aptDay.setHours(8, 0, 0)

  let endDate = new Date(lastAppointmentDate)
  endDate.setDate(endDate.getDate() + (7 - endDate.getDay()))
  endDate.setHours(10, 0, 0)

  // Loop over each row in the sheet
  for (let i = 2; i <= numRows; i++) {
    var rowRange = sheet.getDataRange();
    let inCalendar = rowRange.getCell(i, 10)
    if (inCalendar.isChecked()) continue
    let enrollmentDateColumn = rowRange.getCell(i, 1)
    let studentName = rowRange.getCell(i, 2)
    let dlNumber = rowRange.getCell(i, 3)
    let dateOfBirthColumn = rowRange.getCell(i, 4)
    let studentPhoneNumber = rowRange.getCell(i, 5)
    let permitExpirationColumn = rowRange.getCell(i, 6)
    let gradDate = rowRange.getCell(i, 8)
    let drugTest = rowRange.getCell(i, 9)

    inCalendar.insertCheckboxes()
    inCalendar.check()
    drugTest.insertCheckboxes()

    let enrollmentDate = Utilities.formatDate(new Date(enrollmentDateColumn.getValue()), "PST", "MM-dd-yyyy")
    let dateOfBirth = Utilities.formatDate(new Date(dateOfBirthColumn.getValue()), "PST", "MM-dd-yyyy")
    let permitExpiration = Utilities.formatDate(new Date(permitExpirationColumn.getValue()), "PST", "MM-dd-yyyy")

    if (studentName.isBlank()) continue

    let eventDescription = ''
    eventDescription = eventDescription + 'Appointment#: ' + '\n \n'
      + 'Student Name: ' + studentName.getValue() + '\n \n'
      + 'DL #: ' + dlNumber.getValue() + '\n \n'
      + 'DOB: ' + dateOfBirth + '\n \n'
      + 'Student Phone#: ' + studentPhoneNumber.getValue() + '\n \n'
      + 'Registration Date: ' + enrollmentDate + '\n \n'
      + 'Permit Expiration: ' + permitExpiration + '\n \n'
      + 'Drug Test: '

    let appointment = calendar.createEvent('', aptDay, endDate, { description: eventDescription }).setColor(CalendarApp.EventColor.GRAY)
  }
}