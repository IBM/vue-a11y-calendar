import Calendar from '../calendar/index.vue';
import DatePicker from '../datepicker/index.vue';

export default {
  calendar: {
    component: Calendar,
    title: 'Calendar',
    description: 'The Calendar component provides a responsive, dynamic, accessible, localized month-based calendar.',
    props: [
      {
        name: 'locale',
        type: 'String',
        default: 'en-US',
        description: 'Any valid single locale for Date.prototype.toLocaleString()',
      },
      {
        name: 'microcopy',
        type: 'Object',
        default: '-',
        description: 'Translatable strings for the microcopy for the calendar. All properties must be present to be valid.',
      },
      {
        name: 'microcopy.today',
        type: 'String',
        default: 'Today: {date}',
        description: 'String representation of <code>Today: {date}</code>. Must include <code>{date}</code>, which will be replaced with the localized date.',
      },
      {
        name: 'microcopy.next',
        type: 'String',
        default: 'Next Month',
        description: 'String representation of <code>Next Month</code>',
      },
      {
        name: 'microcopy.previous',
        type: 'String',
        default: 'Previous Month',
        description: 'String representation of <code>Previous Month</code>',
      },
    ],
    events: [
      {
        name: 'dateSelected',
        args: 'target',
        description: 'When a click event is fired on a date, this event will fire and pass the relevant target of the event',
      },
    ],
  },
  datepicker: {
    component: DatePicker,
    title: 'Date picker',
    description: 'The Datepicker component provides a dynamic, accessible, localized month-based datepicker',
    props: [
      {
        name: 'locale',
        type: 'String',
        default: 'en-US',
        description: 'Any valid single locale for Date.prototype.toLocaleString()',
      },
      {
        name: 'label',
        type: 'String',
        default: 'Choose a date',
        description: 'A string for the label of the input field',
      },
      {
        name: 'microcopy',
        type: 'Object',
        default: '-',
        description: 'Translatable strings for the microcopy for the calendar. All properties must be present to be valid.',
      },
      {
        name: 'microcopy.today',
        type: 'String',
        default: 'Today: {date}',
        description: 'String representation of <code>Today: {date}</code>. Must include <code>{date}</code>, which will be replaced with the localized date.',
      },
      {
        name: 'microcopy.next',
        type: 'String',
        default: 'Next Month',
        description: 'String representation of <code>Next Month</code>',
      },
      {
        name: 'microcopy.previous',
        type: 'String',
        default: 'Next Month',
        description: 'String representation of <code>Previous Month</code>',
      },
      {
        name: 'microcopy.open',
        type: 'String',
        default: 'Open Calendar',
        description: 'String representation of <code>Open Calendar</code>',
      },
      {
        name: 'microcopy.cancel',
        type: 'String',
        default: 'Cancel',
        description: 'String representation of <code>Cancel</code>',
      },
      {
        name: 'inputs',
        type: 'Object',
        default: '',
        description: 'Input names (so multiple datepickers can be used in the same form)',
      },
      {
        name: 'inputs.local',
        type: 'String',
        default: 'date-local',
        description: 'Input name and ID for the visible, read-only input field',
      },
      {
        name: 'inputs.day',
        type: 'String',
        default: 'date-day',
        description: 'Input name for the hidden numeric day input',
      },
      {
        name: 'inputs.month',
        type: 'String',
        default: 'date-month',
        description: 'Input name for the hidden numeric month input',
      },
      {
        name: 'inputs.year',
        type: 'String',
        default: 'date-year',
        description: 'Input name for the hidden numeric year input',
      },
    ],
    events: [
      {
        name: 'dateSelected',
        args: 'target',
        description: 'When a click event is fired on a date, this event will fire and pass the relevant target of the event',
      },
    ],
  },
};

