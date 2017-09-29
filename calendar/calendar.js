const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default {
  name: 'calendar',
  props: {
    locale: {
      type: String,
      default: 'en-US',
    },
    type: {
      type: String,
      default: 'view',
      validator(value) {
        const valid = ['view', 'pick', 'edit'];
        if (valid.indexOf(value.toLowerCase()) >= 0) {
          return true;
        }

        return false;
      },
    },
    microcopy: {
      type: Object,
      default() {
        return {
          today: 'Today: {date}',
          next: 'Next Month',
          previous: 'Previous Month',
        };
      },
      validator(value) {
        const keys = ['today', 'next', 'previous'];

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
  computed: {
    months() {
      return months.map((month) => {
        const thisMonth = new Date(Date.parse(`${month} 1, 2017`));

        return {
          short: thisMonth.toLocaleDateString(this.locale, { month: 'short' }),
          long: thisMonth.toLocaleDateString(this.locale, { month: 'long' }),
        };
      });
    },
    days() {
      // Computed
      const days = [];
      const found = [];
      const sorted = [];
      const now = new Date(Date.now());
      const day = now.getDay();
      let next = 0;

      do {
        const short = now.toLocaleDateString(this.locale, { weekday: 'short' });
        const long = now.toLocaleDateString(this.locale, { weekday: 'long' });

        days.push({
          short,
          long,
        });
        found.push(long);

        now.setHours(now.getHours() + 24);
        next = now.toLocaleDateString(this.locale, { weekday: 'long' });
      } while (found.indexOf(next) < 0);

      const start = days.length - 1;
      const end = days.length - 1 - day;

      for (let i = start; i > end; i -= 1) {
        sorted.push(days[i]);
        days.pop();
      }

      const output = sorted.reverse().concat(days);
      return output;
    },
    today() {
      const now = new Date(Date.now());

      return {
        month: now.getMonth(),
        day: now.getDate(),
        year: now.getFullYear(),
      };
    },
    calendar() {
      // Set up current, previous, and next months
      const { current } = this;
      current.days = 32 - new Date(current.year, current.month, 32).getDate();
      current.parsed = new Date(Date.parse(`${months[current.month]} 1, ${current.year}`));
      current.start = new Date(Date.parse(current.parsed)).getDay();
      current.end = new Date(Date.parse(`${months[current.month]} ${current.days}, ${current.year}`)).getDay();
      current.string = current.parsed.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' });

      const next = {
        month: current.month + 1 > 11 ? 0 : current.month + 1,
        year: current.month + 1 > 11 ? current.year + 1 : current.year,
      };
      next.days = 32 - new Date(next.year, next.month, 32).getDate();
      next.parsed = new Date(Date.parse(`${months[next.month]} 1, ${next.year}`));
      next.string = next.parsed.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' });

      const previous = {
        month: current.month - 1 < 0 ? 11 : current.month - 1,
        year: current.month - 1 < 0 ? current.year - 1 : current.year,
      };
      previous.days = 32 - new Date(previous.year, previous.month, 32).getDate();
      previous.parsed = new Date(Date.parse(`${months[previous.month]} 1, ${previous.year}`));
      previous.string = previous.parsed.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' });

      const days = [];
      const leading = 6 - (6 - current.start);
      const trailing = 7 - current.end;
      const start = current.days - (7 - current.start);
      const weeks = Math.ceil(start / 7);

      let offset = 0;

      current.trailing = trailing - 1;

      // Set up days
      for (let i = 0; i < weeks + 1; i += 1) {
        days[i] = [];
      }

      // Set up first week
      for (let i = 0; i < 7; i += 1) {
        if (i < leading) {
          const day = (previous.days - (current.start - 1)) + i;
          const dayString = day.toLocaleString(this.locale);

          days[0].push({
            month: previous.month,
            year: previous.year,
            day,
            dayString,
            string: this.getLocaleDate(day, previous.month, previous.year),
            status: 'disabled',
            focusable: false,
          });
        } else {
          const day = (7 - leading) - (6 - i);
          const isToday = this.isToday({ day, month: current.month, year: current.year });
          const focusable = this.isFocusable({ day, month: current.month, year: current.year });
          const dateString = this.getLocaleDate(day, current.month, current.year);
          const dayString = day.toLocaleString(this.locale);

          days[0].push({
            month: current.month,
            year: current.year,
            day,
            dayString,
            string: isToday ? this.t(this.$props.microcopy.today, { date: dateString }) : dateString,
            status: isToday ? 'active' : '',
            focusable,
          });

          offset = day;
        }
      }

      // Doesn't work when end day is 0
      // Set up remaining weeks
      let week = 1;
      for (let i = 1; i <= current.days - offset; i += 1) {
        const day = i + offset;
        const isToday = this.isToday({ day, month: current.month, year: current.year });
        const focusable = this.isFocusable({ day, month: current.month, year: current.year });
        const dateString = this.getLocaleDate(day, current.month, current.year);
        const dayString = day.toLocaleString(this.locale);

        days[week].push({
          month: current.month,
          year: current.year,
          day,
          dayString,
          string: isToday ? this.t(this.$props.microcopy.today, { date: dateString }) : dateString,
          status: isToday ? 'active' : '',
          focusable,
        });

        if (i % 7 === 0) {
          week += 1;
        }
      }

      // Fill final week
      for (let i = 1; i < trailing; i += 1) {
        const dayString = i.toLocaleString(this.locale);
        days[week].push({
          month: next.month,
          year: next.year,
          day: i,
          dayString,
          string: this.getLocaleDate(i, next.month, next.year),
          status: 'disabled',
          focusable: false,
        });
      }

      return {
        current,
        previous,
        next,
        days,
      };
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
    setFocus(last, offset) {
      const items = Array.from(this.$refs.calendar);
      if (last) {
        items.find(elem => elem.parentNode.classList.contains('calendar__day')).setAttribute('tabindex', -1);
        items.reverse();
      }
      const itemIndex = items.findIndex(elem => elem.parentNode.classList.contains('calendar__day'));
      let item = items[itemIndex];

      if (offset) {
        item = items[itemIndex + offset];
      }

      item.focus();
      item.setAttribute('tabindex', 0);
      return item;
    },
    select(e) {
      let { target } = e;

      if (target.classList.contains('calendar__date')) {
        target = target.parentNode;
      }
      // https://sebastiandedeyne.com/posts/2017/using-registered-event-listeners-as-conditionals-in-vue
      this.$emit('dateSelected', target);
    },
    isFocusable(current) {
      const { today } = this;

      if (this.isToday(current)) {
        return true;
      } else if (current.day === 1) {
        if (current.month !== today.month) {
          return true;
        } else if (current.year !== today.year) {
          return true;
        }
      }

      return false;
    },
    calendarNav(dir, e) {
      // Do proper offset so we only navigate inside of the current month, and move to next/previous month at last/first day
      const elem = this.$refs.calendar.findIndex(elm => elm === e.target);

      e.preventDefault(); // Prevent scrolling when using the arrow keys to navigate the calendar

      if (dir === 'next') {
        if (elem + 1 <= this.current.days + this.current.start - 1) { // eslint-disable-line no-mixed-operators
          this.$refs.calendar[elem + 1].focus();
          this.$refs.calendar[elem].setAttribute('tabindex', -1);
          this.$refs.calendar[elem + 1].setAttribute('tabindex', 0);
        } else {
          this.navigate('next');
          this.$nextTick(function navNextTick() {
            this.setFocus();
          });
        }
      } else if (dir === 'down') {
        const total = this.current.days + this.current.start - 1; // eslint-disable-line no-mixed-operators
        const date = elem - this.current.start; // eslint-disable-line no-mixed-operators
        const offset = this.current.days - date;
        if (elem + 7 <= total) {
          this.$refs.calendar[elem + 7].focus();
          this.$refs.calendar[elem].setAttribute('tabindex', -1);
          this.$refs.calendar[elem + 7].setAttribute('tabindex', 0);
        } else {
          this.navigate('next');
          this.$nextTick(function navPreviousTick() {
            this.setFocus(false, 7 - offset);
          });
        }
      } else if (dir === 'prev') {
        if (elem - 1 >= this.current.start) {
          this.$refs.calendar[elem - 1].focus();
          this.$refs.calendar[elem].setAttribute('tabindex', -1);
          this.$refs.calendar[elem - 1].setAttribute('tabindex', 0);
        } else {
          this.navigate('prev');
          this.$nextTick(function navPreviousTick() {
            this.setFocus(true);
          });
        }
      } else if (dir === 'up') {
        const offset = 6 + this.current.start - elem; // eslint-disable-line no-mixed-operators
        if (elem - 7 >= this.current.start) {
          this.$refs.calendar[elem - 7].focus();
          this.$refs.calendar[elem].setAttribute('tabindex', -1);
          this.$refs.calendar[elem - 7].setAttribute('tabindex', 0);
        } else {
          this.navigate('prev');
          this.$nextTick(function navPreviousTick() {
            this.setFocus(true, offset);
          });
        }
      }
    },
    getLocaleDate(day, month, year) {
      // Move this in to computed/calendar view
      const toGet = `${months[month]} ${day}, ${year}`;
      return new Date(Date.parse(toGet)).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    },
    isToday(current) {
      return current.day === this.today.day && current.month === this.today.month && current.year === this.today.year;
    },
    navigate(dir) {
      const move = {};
      if (dir === 'next') {
        move.month = this.current.month + 1 > 11 ? 0 : this.current.month + 1;
        move.year = this.current.month + 1 > 11 ? this.current.year + 1 : this.current.year;
      } else if (dir === 'prev') {
        move.month = this.current.month - 1 < 0 ? 11 : this.current.month - 1;
        move.year = this.current.month - 1 < 0 ? this.current.year - 1 : this.current.year;
      }

      this.setCurrent(move.month, move.year);
      return move;
    },
    getCurrent() {
      const current = {};
      const now = new Date(Date.now());

      current.month = now.getMonth();
      current.year = now.getFullYear();

      // If routing is in place _and_
      if (this.$route) {
        const { params } = this.$route;

        if (params && Object.prototype.hasOwnProperty.call(params, 'year') && Object.prototype.hasOwnProperty.call(params, 'month')) {
          params.year = parseInt(params.year, 10); // Make sure parameter is an integer

          const validYear = Number.isInteger(params.year) && params.year >= 1911;
          const parsedMonth = new Date(Date.parse(`${params.month} 1, 2017`)).toLocaleDateString('en-US', { month: 'long' });
          const validMonth = typeof params.month === 'string' && months.indexOf(parsedMonth) >= 0;

          if (validYear) {
            current.year = params.year;
          }

          if (validMonth) {
            current.month = months.indexOf(parsedMonth);
          }

          this.$router.push({
            params: {
              year: current.year,
              month: months[current.month].toLowerCase(),
            },
          });
        }
      }

      return current;
    },
    setCurrent(month, year) {
      this.current = {
        month,
        year,
      };

      if (this.$router) {
        this.$router.push({
          params: {
            year,
            month: months[month].toLowerCase(),
          },
        });
      }
    },
  },
  data() {
    // Going to want to push URL for deep linking
    // Going to want current to be an object maybe? Month/Year
    // Today may need to be different data
    return {
      current: this.getCurrent(), // Dunno what to do with you
      tab: false,
      tableID: this._uid, // eslint-disable-line no-underscore-dangle
    };
  },
};
