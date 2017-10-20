import calendar from '../calendar/index.vue';

export default {
  name: 'datepicker',
  components: {
    calendar,
  },
  props: {
    type: {
      type: String,
      default: 'single',
      validator(value) {
        return value === 'single' || value === 'range';
      },
    },
    locale: {
      type: String,
      default: 'en-US',
    },
    label: {
      type: [String, Object],
      default() {
        if (this.type === 'single') {
          return 'Choose a date';
        }

        return {
          start: 'Choose a starting date',
          end: 'Choose an ending date',
        };
      },
    },
    inputs: {
      type: Object,
      default() {
        const value = {
          local: 'date-local',
          day: 'date-day',
          month: 'date-month',
          year: 'date-year',
        };

        return value;
      },
      validator(value) {
        const keys = ['local', 'day', 'month', 'year'];

        // Make sure all three keys are there
        if (keys.find(k => value[k] === undefined)) {
          return false;
        }

        return true;
      },
    },
    microcopy: {
      type: Object,
      default() {
        const value = {
          today: 'Today: {date}',
          next: 'Next Month',
          previous: 'Previous Month',
          open: 'Open Calendar',
          cancel: 'Cancel',
        };

        return value;
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
      if (this.type === 'single') {
        this.selectedDay = target.dataset.day;
        this.selectedMonth = target.dataset.month;
        this.selectedYear = target.dataset.year;
      } else if (this.type === 'range') {
        if (this.range === 0) {
          this.selectedDay = target.dataset.day;
          this.selectedMonth = target.dataset.month;
          this.selectedYear = target.dataset.year;
          this.range += 1;
        } else {
          if (target.dataset.year <= this.selectedYear && target.dataset.month <= this.selectedMonth && target.dataset.day <= this.selectedDay) {
            this.selectedDayEnd = this.selectedDay;
            this.selectedMonthEnd = this.selectedMonth;
            this.selectedYearEnd = this.selectedYear;

            this.selectedDay = target.dataset.day;
            this.selectedMonth = target.dataset.month;
            this.selectedYear = target.dataset.year;
          } else {
            this.selectedDayEnd = target.dataset.day;
            this.selectedMonthEnd = target.dataset.month;
            this.selectedYearEnd = target.dataset.year;
          }
          this.range += 1;
        }
      }

      if (this.range === 2) {
        this.$el.querySelector('.datepicker__popup').setAttribute('data-state', 'closed');
        this.$el.querySelector('.datepicker__input').focus();
        this.range = 0;
      }

    },
    transformLocal(year, month, day) {
      const date = new Date(year, month, day);
      if (this.selectedYear === '' || this.selectedMonth === '' || this.selectedDay === '') {
        return '';
      }

      return date.toLocaleDateString(this.locale);
    }
  },
  computed: {
    selectedLocal() {
      return this.transformLocal(this.selectedYear, this.selectedMonth, this.selectedDay);
    },
    selectedLocalEnd() {
      return this.transformLocal(this.selectedYearEnd, this.selectedMonthEnd, this.selectedDayEnd);
    },
  },
  data() {
    return {
      selectedDay: '',
      selectedMonth: '',
      selectedYear: '',
      selectedDayEnd: '',
      selectedMonthEnd: '',
      selectedYearEnd: '',
      range: 0,
    };
  },
};
