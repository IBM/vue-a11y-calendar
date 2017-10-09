import calendar from '../calendar/index.vue';

export default {
  name: 'datepicker',
  components: {
    calendar,
  },
  props: {
    locale: {
      type: String,
      default: 'en-US',
    },
    label: {
      type: String,
      default: 'Choose a date',
    },
    inputs: {
      type: Object,
      default() {
        return {
          local: 'date-local',
          day: 'date-day',
          month: 'date-month',
          year: 'date-year',
        };
      },
      validator(value) {
        const keys = ['local', 'day', 'month', 'year'];

        // Make sure all three keys are there
        if (JSON.stringify(Object.keys(value)) !== JSON.stringify(keys)) {
          return false;
        }

        return true;
      },
    },
    microcopy: {
      type: Object,
      default() {
        return {
          today: 'Today: {date}',
          next: 'Next Month',
          previous: 'Previous Month',
          open: 'Open Calendar',
          cancel: 'Cancel',
        };
      },
      validator(value) {
        const keys = ['today', 'next', 'previous', 'open', 'cancel'];

        // Make sure all required keys are there
        if (keys.find(k => value[k] === undefined)) {
          return false;
        }

        // Make sure `today` includes `{date}`
        if (value.today.indexOf('{date}') < 0) {
          return false;
        }

        return true;
      },
    },
  },
  methods: {
    t(value, props = {}) {
      let output = value;
      Object.keys(props).forEach((prop) => {
        const replace = new RegExp(`{${prop}}`, 'g');
        output = output.replace(replace, props[prop]);
      });

      return output;
    },
    open(e) {
      e.preventDefault();
      const { calendar: cal } = this.$children[0].$refs;
      this.$el.querySelector('.datepicker__popup').setAttribute('data-state', 'open');
      cal.find(elem => elem.getAttribute('tabindex') === '0').focus();
    },
    tabcapture(e) {
      const { target } = e;
      const { calendar: cal } = this.$children[0].$refs;

      if (target.classList.contains('calendar__link') && e.shiftKey === true) {
        const cancel = this.$el.querySelector('.datepicker__cancel');
        e.preventDefault();
        cancel.focus();
      } else if (target.classList.contains('datepicker__cancel') && e.shiftKey === false) {
        const item = cal.find(elem => elem.getAttribute('tabindex') === '0');
        e.preventDefault();
        item.focus();
      }
    },
    cancel() {
      this.$el.querySelector('.datepicker__activate').focus();
      this.$el.querySelector('.datepicker__popup').setAttribute('data-state', 'closed');
    },
    select(target) {
      const date = new Date(target.dataset.year, target.dataset.month, target.dataset.day);
      this.selectedDay = target.dataset.day;
      this.selectedMonth = target.dataset.month;
      this.selectedYear = target.dataset.year;

      this.$el.querySelector('.datepicker__popup').setAttribute('data-state', 'closed');
      this.$el.querySelector('.datepicker__input').focus();
    },
  },
  computed: {
    selectedLocal() {
      const date = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
      if (this.selectedYear === '' || this.selectedMonth === '' || this.selectedDay === '') {
        return '';
      }

      return date.toLocaleDateString(this.locale);
    },
  },
  data() {
    return {
      selectedDay: '',
      selectedMonth: '',
      selectedYear: '',
    };
  },
};
