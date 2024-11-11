/*
*=========================================
*          SETTINGS AND FILTERS
*=========================================
*/
const appSettings = {
  howFrequent: 15,                         //What interval (minutes) to run this script to check for new/modified events.  Any integer can be used, but will be rounded up to 5, 10, 15, 30 or to the nearest hour after that.. 60, 120, etc. 1440 (24 hours) is the maximum value.  Anything above that will be replaced with 1440.
  email: "",                               //If Email Summary is true or you want to receive update notifications, you will need to provide your email address.
  emailSummary: false,                     //Will email you when an event is added/modified/removed to/from your calendar.
  customEmailSubject: "",                  //If you want to change the email subject, provide a custom one here. Default: 'GAS-ICS-Sync Execution Summary'.
  dateFormat: ""                           //Custom date format in the email summary (e.g. 'YYYY-MM-DD', 'DD.MM.YYYY', 'MM/DD/YYYY'. Separators are '.', '-' and '/').
};

/*
*=========================================
*         Default Sync Settings
*=========================================
*These settings apply to all calendars unless overriden with calendar-specific settings below.
*/

const defaultSettings = {
  color: null,
  addEventsToCalendar: true,
  modifyExistingEvents: true,
  removePastEventsFromCalendar: true,
  removeEventsFromCalendar: true,
  addOrganizerToTitle: false,
  descriptionAsTitles: false,
  addCalToTitle: false,
  addAlerts: "default",
  addAttendees: false,
  defaultAllDayReminder: null,
  overrideVisibility: "",
  addTasks: false,
  filters: []
};


/*
*=========================================
*          Calendar Settings
*=========================================
EXAMPLE:
sourceCalendars = [
  {
    //The three fields listed below are required fields for every calendar.  sourceCalendarName must only be used once in the script.
    sourceCalendarName: "Work Calendar",  This is a friendly name for the source calendar you want the script to sync
    sourceURL: "http://someURLforWork.com/someCalendar.ics",   This is the URL of the source calendar
    targetCalendarName: "My Work Calendar", This is the name of the target calendar in Google you want to sync to.  For your personal calendar, use your email address (xyz@gmail.com)

    //Additional properties below can be set from the default list above but customized to be calendar-specific.  These are optional.
    color: 5,
    filers: ['onlyFutureEvents'] //add a comma-separated list of all filter-ids you want to apply
  }  // use a comma after } if there are other calendars.  No comma on last entry.
];
*/


const sourceCalendars = [
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - Seniors",               //Required
  color: 5,
  filters: ['onlyConfirmed-Seniors']
  },
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - Ladies",               //Required
  color: 6,
  filters: ['onlyConfirmed-Ladies']
  },
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - Men",               //Required
  color: 7,
  filters: ['onlyConfirmed-Men']
  },
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - Mixed",               //Required
  color: 8,
  filters: ['onlyConfirmed-Mixed']
  },
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - General",               //Required
  color: 8,
  filters: ['onlyConfirmed-General']
  },
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - Social",               //Required
  color: 8,
  filters: ['onlyConfirmed-Social']
  },
  {
  sourceCalendarName: "Clandon Regis",                    //Required
  sourceURL: "https://calendar.google.com/calendar/ical/8q4fle42kap7tl26ub19k6sd9vffgsf7%40import.calendar.google.com/public/basic.ics",                     //Required
  targetCalendarName: "CRGC IG Test 1 - External",               //Required
  color: 8,
  filters: ['onlyConfirmed-External']
  }
];
/*
*=========================================
*             Event Filters
*=========================================
Filters for calendar events based on ical properties (RFC 5545).
Define each filter with the following structure and add them to the filters object below:
'uniqueID': {
              parameter: "property",      // Event property to filter by (e.g., "summary", "categories", "dtend", "dtstart").
              type: "include/exclude",    // Whether to include or exclude events matching the criteria.
              comparison: "method",       // Comparison method: "equals", "begins with", "contains", "regex", "<", ">".
                                          // Note: "<", ">" only apply for date/time properties.
              criterias: ["values"],      // Array of values or patterns for comparison.
              offset: number              // (Optional) For date/time properties, specify an offset in days.
            }
*/
const filters = {
  'onlyConfirmed-Seniors': {
                      parameter: "summary", // Include events whose summary starts with "Seniors".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["Seniors"]
                  },
  'onlyConfirmed-Ladies': {
                      parameter: "summary", // Include events whose summary starts with "Ladies".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["Ladies", "ladies"]
                  }, 
  'onlyConfirmed-Men': {
                      parameter: "summary", // Include events whose summary starts with "Men".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["Men"]
                  }, 
  'onlyConfirmed-Mixed':{
                      parameter: "summary", // Include events whose summary starts with "Mixed".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["Mixed"]
                  },    
  'onlyConfirmed-General':{
                      parameter: "summary", // Include events whose summary starts with "General".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["General"]
                  },   
  'onlyConfirmed-Social':{
                      parameter: "summary", // Include events whose summary starts with "*" or "Social".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["\\*", "Social"]
                  }, 
  'onlyConfirmed-External':{
                      parameter: "summary", // Include events whose summary starts with "External".
                      type: "include",
                      comparison: "begins with",
                      criterias: ["External"]
                  }                 
};
