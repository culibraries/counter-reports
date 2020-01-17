export const Config = {
  validatorMessage: {
    duplicatedFromField: '(*) A From field has been already selected',
    duplicatedToField: '(*) A To field has been already selected',
    requiredFromField: '(*) From : MM/YYYY is required',
    requiredToField: '(*) To : MM/YYYY is required',
    requiredPlatform: '(*) Platform: Platform name is required',
    requiredPublisher: '(*) Publisher: Publisher name is required',
    requiredTitle: '(*) Title: Title name is required',
    validFromToField: '(*) To date should greater than or equal From date',
    invalidLoginField: 'Oops ! Invalid username and/or password',
  },
  authenticationMessage: {
    unauthorizedAccess: 'You are not authorized', // Account exist but not belong to admin group
    notExist: 'No active account found with the given credentials', // Account Not found in the system
    tokenisNotValid: 'You are out of session ! Please log back in', // Invalid Token
    generalErrorMessage:
      'Error ! Please create a ticket to LIT for further assistance',
  },
  snackBar: {
    duration: 4000,
  },
  messages: {
    warningAllRecords: 'All data are being retrieved',
  },
  group: 'admin-counter',
  years: [
    '2027',
    '2026',
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
  ],
  months: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
};
