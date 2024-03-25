# National Truck School Scheduling App
## Description
The National Truck School Scheduling App is designed to transition the truck driving school's administrative tasks from a cumbersome paper-based system to a streamlined digital solution. Developed using Google Apps Script, this app automates various administrative functions such as onboarding new students, booking appointments, tracking payments, and generating graduation certificates. The goal is to enhance efficiency, reduce paperwork, and improve the overall management of student records.

## Features
#### Student Onboarding: 
Collects new student information through an Adobe PDF document, including name, driver's license number, date of birth, phone number, and permit expiration date.
#### Appointment Scheduling: 
Books an initial appointment on Google Calendar using the student's information and allows for easy rescheduling once a DMV appointment is confirmed.
#### Student Tracking: 
Maintains a Google Sheet database of all current and graduated students, tracking their status, payments, and other relevant information.
#### Graduation Processing: 
Updates student records with graduation dates, automatically moving them from the current to the graduated student list.
#### Data Management: 
Offers features like duplication removal and data filters to ensure clean and organized records.
## Technology Stack
#### Adobe Acrobat: PDF document handling.
#### Google Apps Script: Automating workflows and integrating with other Google services.
#### Google Drive: Storing PDF documents.
#### Google Sheets: Tracking student information and statuses.
#### Google Calendar: Managing appointments.
## Usage Instructions
#### For Onboarding New Students: 
Fill out and submit the student application PDF form. The system will automatically book an initial appointment and store the student's information.
#### For Recording Payments:
Open up the PDF and update the payment section, record signatures, that's it.
#### For Scheduling and Rescheduling Appointments: 
Use Google Calendar to manage appointments. Rescheduled appointments are easily updated to reflect new DMV appointment times.
#### For Graduating Students: 
Update the student's application PDF with their graduation date. The app will automatically move the student to the graduated list in Google Sheets.