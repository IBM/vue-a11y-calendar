import Vue from 'vue';
import Calendar from '@/calendar'; // eslint-disable-line import/no-unresolved, import/extensions

const Constructor = Vue.extend(Calendar);

/*
 * calendar.props.locale
 */
describe('Calendar.vue - props.locale', () => {
  it('should have a default `locale`', () => {
    const vm = new Constructor().$mount();
    expect(vm.locale).to.equal('en-US');
  });

  it('should take `locale` as a prop', () => {
    const vm = new Constructor({
      propsData: {
        locale: 'ar',
      },
    }).$mount();
    expect(vm.locale).to.equal('ar');
  });
});

/*
 * calendar.props.microcopy
 */
describe('Calendar.vue - props.microcopy', () => {
  it('should have a default `microcopy`', () => {
    const vm = new Constructor().$mount();
    expect(vm.microcopy).to.deep.equal({
      today: 'Today: {date}',
      next: 'Next Month',
      previous: 'Previous Month',
    });
  });

  it('should take a valid `microcopy` as a prop', () => {
    const microcopy = {
      today: 'Foo: {date}',
      next: 'Bar',
      previous: 'Baz',
    };
    const vm = new Constructor({
      propsData: {
        microcopy,
      },
    }).$mount();
    expect(vm.microcopy).to.deep.equal(microcopy);
  });

  it('should invalidate `microcopy` without all needed keys', () => {
    const microcopy1 = { next: 'Bar', previous: 'Baz' };
    const microcopy2 = { today: 'Foo: {date}', previous: 'Baz' };
    const microcopy3 = { today: 'Foo: {date}', next: 'Bar' };

    const expectation = '[Vue warn]: Invalid prop: custom validator check failed for prop "microcopy".\n\n(found in <Root>)';
    const consoleStub = sinon.stub(console, 'error');

    // Missing Today
    new Constructor({
      propsData: {
        microcopy: microcopy1,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Next
    new Constructor({
      propsData: {
        microcopy: microcopy2,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Previous
    new Constructor({
      propsData: {
        microcopy: microcopy3,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);
    consoleStub.restore();
  });

  it('should invalidate `microcopy` if `microcopy.today` is malformed', () => {
    const microcopy = { today: 'Foo', next: 'Bar', previous: 'Baz' };
    const expectation = '[Vue warn]: Invalid prop: custom validator check failed for prop "microcopy".\n\n(found in <Root>)';
    const consoleStub = sinon.stub(console, 'error');
    new Constructor({
      propsData: {
        microcopy,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);
    consoleStub.restore();
  });
});

/*
 * calendar.computed.months
 */
describe('Calendar.vue - computed.months', () => {
  it('should return an array of months with short/long values', () => {
    const expected = [
      { short: 'Jan', long: 'January' },
      { short: 'Feb', long: 'February' },
      { short: 'Mar', long: 'March' },
      { short: 'Apr', long: 'April' },
      { short: 'May', long: 'May' },
      { short: 'Jun', long: 'June' },
      { short: 'Jul', long: 'July' },
      { short: 'Aug', long: 'August' },
      { short: 'Sep', long: 'September' },
      { short: 'Oct', long: 'October' },
      { short: 'Nov', long: 'November' },
      { short: 'Dec', long: 'December' },
    ];
    const vm = new Constructor().$mount();

    expect(vm.months).to.deep.equal(expected);
  });

  it('should return a localized array of months with short/long values', () => {
    const expected = [
      { short: 'janv.', long: 'janvier' },
      { short: 'févr.', long: 'février' },
      { short: 'mars', long: 'mars' },
      { short: 'avr.', long: 'avril' },
      { short: 'mai', long: 'mai' },
      { short: 'juin', long: 'juin' },
      { short: 'juil.', long: 'juillet' },
      { short: 'août', long: 'août' },
      { short: 'sept.', long: 'septembre' },
      { short: 'oct.', long: 'octobre' },
      { short: 'nov.', long: 'novembre' },
      { short: 'déc.', long: 'décembre' },
    ];
    const vm = new Constructor({
      propsData: {
        locale: 'fr',
      },
    }).$mount();

    expect(vm.months).to.deep.equal(expected);
  });
});

/*
 * calendar.computed.days
 */
describe('Calendar.vue - computed.days', () => {
  it('should return an array of days of the week with short/long values', () => {
    const expected = [
      { short: 'Sun', long: 'Sunday' },
      { short: 'Mon', long: 'Monday' },
      { short: 'Tue', long: 'Tuesday' },
      { short: 'Wed', long: 'Wednesday' },
      { short: 'Thu', long: 'Thursday' },
      { short: 'Fri', long: 'Friday' },
      { short: 'Sat', long: 'Saturday' },
    ];
    const vm = new Constructor().$mount();

    expect(vm.days).to.deep.equal(expected);
  });

  it('should return a localized array of days with short/long values', () => {
    const expected = [
      { short: 'dom.', long: 'domingo' },
      { short: 'lun.', long: 'lunes' },
      { short: 'mar.', long: 'martes' },
      { short: 'mié.', long: 'miércoles' },
      { short: 'jue.', long: 'jueves' },
      { short: 'vie.', long: 'viernes' },
      { short: 'sáb.', long: 'sábado' },
    ];
    const vm = new Constructor({
      propsData: {
        locale: 'es',
      },
    }).$mount();

    expect(vm.days).to.deep.equal(expected);
  });
});


/*
 * calendar.computed.calendar
 */
function generateMonths(locale = 'en-US') {
  const today = new Date(Date.now());
  const current = {
    days: 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    parsed: new Date(today.getFullYear(), today.getMonth(), 1),
  };

  current.start = current.parsed.getDay();
  current.end = new Date(current.year, current.month, current.days).getDay();
  current.string = current.parsed.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  current.trailing = 6 - current.end;

  const previous = {
    month: current.month - 1 < 0 ? 11 : current.month - 1,
    year: current.month - 1 < 0 ? current.year - 1 : current.year,
  };

  previous.days = 32 - new Date(previous.year, previous.month, 32).getDate();
  previous.parsed = new Date(previous.year, previous.month, 1);
  previous.string = previous.parsed.toLocaleDateString(locale, { month: 'long', year: 'numeric' });

  const next = {
    month: current.month + 1 > 11 ? 0 : current.month + 1,
    year: current.month + 1 > 11 ? current.year + 1 : current.year,
  };

  next.days = 32 - new Date(next.year, next.month, 32).getDate();
  next.parsed = new Date(next.year, next.month, 1);
  next.string = next.parsed.toLocaleDateString(locale, { month: 'long', year: 'numeric' });

  return {
    current,
    previous,
    next,
  };
}

describe('Calendar.vue - computed.calendar', () => {
  it('should return a calendar object', () => {
    const vm = new Constructor().$mount();
    const months = generateMonths();

    expect(Object.keys(vm.calendar)).to.deep.equal(['current', 'previous', 'next', 'days']);
    expect(vm.calendar.current).to.deep.equal(months.current);
    expect(vm.calendar.previous).to.deep.equal(months.previous);
    expect(vm.calendar.next).to.deep.equal(months.next);
    expect(vm.calendar.days).to.be.an('array');

    vm.calendar.days.forEach((week) => {
      expect(week).to.be.an('array');

      week.forEach((day) => {
        expect(Object.keys(day)).to.deep.equal(['month', 'year', 'day', 'dayString', 'string', 'status', 'focusable']);
      });
    });
  });

  it('should return a localized calendar object', () => {
    const vm = new Constructor({
      propsData: {
        locale: 'ar',
      },
    }).$mount();
    const months = generateMonths('ar');

    expect(Object.keys(vm.calendar)).to.deep.equal(['current', 'previous', 'next', 'days']);
    expect(vm.calendar.current).to.deep.equal(months.current);
    expect(vm.calendar.previous).to.deep.equal(months.previous);
    expect(vm.calendar.next).to.deep.equal(months.next);
    expect(vm.calendar.days).to.be.an('array');

    vm.calendar.days.forEach((week) => {
      expect(week).to.be.an('array');

      week.forEach((day) => {
        expect(Object.keys(day)).to.deep.equal(['month', 'year', 'day', 'dayString', 'string', 'status', 'focusable']);
      });
    });
  });
});

/*
 * calendar.methods.t
 */
describe('Calendar.vue - methods.t', () => {
  it('should replace items in a string', () => {
    const vm = new Constructor().$mount();

    expect(vm.t('Foo: {date}', { date: 'bar' })).to.equal('Foo: bar');
    expect(vm.t('Foo: {date}', { bar: 'baz' })).to.equal('Foo: {date}');
    expect(vm.t('Foo{date}: {date}', { date: 'bar' })).to.equal('Foobar: bar');
  });
});

/*
 * calendar.methods.setFocus
 */
describe('Calendar.vue - methods.setFocus', () => {
  it('should return the first day in the current', () => {
    const today = new Date(Date.now());
    const vm = new Constructor().$mount();
    const item = vm.setFocus();

    expect(item.tagName).to.equal('BUTTON');
    expect(item.getAttribute('tabindex')).to.equal('0');
    expect(item.getAttribute('data-day')).to.equal('1');
    expect(item.getAttribute('data-month')).to.equal(`${today.getMonth()}`);
    expect(item.getAttribute('data-year')).to.equal(`${today.getFullYear()}`);
  });

  it('should return the last day in the current', () => {
    const today = new Date(Date.now());
    const last = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const vm = new Constructor().$mount();
    const item = vm.setFocus(true);

    expect(item.tagName).to.equal('BUTTON');
    expect(item.getAttribute('tabindex')).to.equal('0');
    expect(item.getAttribute('data-day')).to.equal(`${last}`);
    expect(item.getAttribute('data-month')).to.equal(`${today.getMonth()}`);
    expect(item.getAttribute('data-year')).to.equal(`${today.getFullYear()}`);
  });

  it('should return the first day with an offset in the current', () => {
    const today = new Date(Date.now());
    const vm = new Constructor().$mount();
    const item = vm.setFocus(false, 3);

    expect(item.tagName).to.equal('BUTTON');
    expect(item.getAttribute('tabindex')).to.equal('0');
    expect(item.getAttribute('data-day')).to.equal('4');
    expect(item.getAttribute('data-month')).to.equal(`${today.getMonth()}`);
    expect(item.getAttribute('data-year')).to.equal(`${today.getFullYear()}`);
  });

  it('should return the last day with an offset in the current', () => {
    const today = new Date(Date.now());
    const last = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const vm = new Constructor().$mount();
    const item = vm.setFocus(true, 5);

    expect(item.tagName).to.equal('BUTTON');
    expect(item.getAttribute('tabindex')).to.equal('0');
    expect(item.getAttribute('data-day')).to.equal(`${last - 5}`);
    expect(item.getAttribute('data-month')).to.equal(`${today.getMonth()}`);
    expect(item.getAttribute('data-year')).to.equal(`${today.getFullYear()}`);
  });
});

/*
 * calendar.methods.getLocaleDate
 */
describe('Calendar.vue - methods.getLocaleDate', () => {
  it('should return a locale date', () => {
    const vm = new Constructor().$mount();

    expect(vm.getLocaleDate(1, 10, 2017)).to.equal('Wednesday, November 1, 2017');
  });

  it('should return a localized date', () => {
    const vm = new Constructor({
      propsData: {
        locale: 'de',
      },
    }).$mount();

    expect(vm.getLocaleDate(1, 10, 2017)).to.equal('Mittwoch, 1. November 2017');
  });
});

/*
 * calendar.methods.isToday
 */
describe('Calendar.vue - methods.isToday', () => {
  it('should be `true` if its today', () => {
    const today = new Date(Date.now());
    const vm = new Constructor().$mount();
    const current = {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    };

    expect(vm.isToday(current)).to.be.true; // eslint-disable-line no-unused-expressions
  });

  it('should be `false` if its not today', () => {
    const today = new Date(Date.now());
    const vm = new Constructor().$mount();
    const current = {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear() + 1,
    };

    expect(vm.isToday(current)).to.be.false; // eslint-disable-line no-unused-expressions
  });
});

/*
 * calendar.methods.navigate
 */
describe('Calendar.vue - methods.navigate', () => {
  it('should navigate next', () => {
    const today = new Date(Date.now());
    const vm = new Constructor().$mount();
    const next = {
      month: today.getMonth() + 1 > 11 ? 0 : today.getMonth() + 1,
      year: today.getMonth() + 1 > 11 ? today.getFullYear() + 1 : today.getFullYear(),
    };

    expect(vm.navigate('next')).to.deep.equal(next);
    expect(vm.current.month).to.equal(next.month);
    expect(vm.current.year).to.equal(next.year);
  });

  it('should navigate previous', () => {
    const today = new Date(Date.now());
    const vm = new Constructor().$mount();
    const prev = {
      month: today.getMonth() - 1 < 0 ? 11 : today.getMonth() - 1,
      year: today.getMonth() - 1 < 0 ? today.getFullYear() - 1 : today.getFullYear(),
    };

    expect(vm.navigate('prev')).to.deep.equal(prev);
    expect(vm.current.month).to.equal(prev.month);
    expect(vm.current.year).to.equal(prev.year);
  });
});
