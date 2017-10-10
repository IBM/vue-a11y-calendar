import Vue from 'vue';
import Calendar from '@/calendar';

const Constructor = Vue.extend(Calendar);

/*
 * calendar.props.microcopy
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
    const microcopy1 = { next: 'Bar', previous: 'Baz'};
    const microcopy2 = { today: 'Foo: {date}', previous: 'Baz' };
    const microcopy3 = { today: 'Foo: {date}', next: 'Bar' };

    const expectation = `[Vue warn]: Invalid prop: custom validator check failed for prop "microcopy".\n\n(found in <Root>)`;
    const consoleStub = sinon.stub(console, 'error');

    // Missing Today
    let vm = new Constructor({
      propsData: {
        microcopy: microcopy1,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Next
    vm = new Constructor({
      propsData: {
        microcopy: microcopy2,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Previous
    vm = new Constructor({
      propsData: {
        microcopy: microcopy3,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);
    consoleStub.restore();
  });

  it('should invalidate `microcopy` if `microcopy.today` is malformed', () => {
    const microcopy = { today: 'Foo', next: 'Bar', previous: 'Baz'};
    const expectation = `[Vue warn]: Invalid prop: custom validator check failed for prop "microcopy".\n\n(found in <Root>)`;
    const consoleStub = sinon.stub(console, 'error');
    const vm = new Constructor({
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
      { short:'Jan', long: 'January' },
      { short:'Feb', long: 'February' },
      { short:'Mar', long: 'March' },
      { short:'Apr', long: 'April' },
      { short:'May', long: 'May' },
      { short:'Jun', long: 'June' },
      { short:'Jul', long: 'July' },
      { short:'Aug', long: 'August' },
      { short:'Sep', long: 'September' },
      { short:'Oct', long: 'October' },
      { short:'Nov', long: 'November' },
      { short:'Dec', long: 'December' },
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
