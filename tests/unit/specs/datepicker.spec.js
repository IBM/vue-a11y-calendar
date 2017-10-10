import Vue from 'vue';
import Datepicker from '@/datepicker'; // eslint-disable-line import/no-unresolved, import/extensions

const Constructor = Vue.extend(Datepicker);

/*
 * datepicker.props.locale
 */
describe('Datepicker.vue - props.locale', () => {
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
 * datepicker.props.microcopy
 */
describe('Datepicker.vue - props.microcopy', () => {
  it('should have a default `microcopy`', () => {
    const vm = new Constructor().$mount();
    expect(vm.microcopy).to.deep.equal({
      today: 'Today: {date}',
      next: 'Next Month',
      previous: 'Previous Month',
      open: 'Open Calendar',
      cancel: 'Cancel',
    });
  });

  it('should take a valid `microcopy` as a prop', () => {
    const microcopy = {
      today: 'Foo: {date}',
      next: 'Bar Month',
      previous: 'Baz Month',
      open: 'Qux Calendar',
      cancel: 'No',
    };
    const vm = new Constructor({
      propsData: {
        microcopy,
      },
    }).$mount();
    expect(vm.microcopy).to.deep.equal(microcopy);
  });

  it('should invalidate `microcopy` without all needed keys', () => {
    const microcopy1 = {
      next: 'Bar', previous: 'Baz', open: 'Qux', close: 'Waldo',
    };
    const microcopy2 = {
      today: 'Foo: {date}', previous: 'Baz', open: 'Qux', close: 'Waldo',
    };
    const microcopy3 = {
      today: 'Foo: {date}', next: 'Bar', open: 'Qux', close: 'Waldo',
    };
    const microcopy4 = {
      today: 'Foo: {date}', next: 'Bar', previous: 'Baz', open: 'Qux',
    };
    const microcopy5 = {
      today: 'Foo: {date}', next: 'Bar', previous: 'Baz', close: 'Waldo',
    };

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

    // Missing Open
    new Constructor({
      propsData: {
        microcopy: microcopy4,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Cancel
    new Constructor({
      propsData: {
        microcopy: microcopy5,
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
 * datepicker.props.inputs
 */
describe('Datepicker.vue - props.inputs', () => {
  it('should have a default `inputs`', () => {
    const vm = new Constructor().$mount();
    expect(vm.inputs).to.deep.equal({
      local: 'date-local',
      day: 'date-day',
      month: 'date-month',
      year: 'date-year',
    });
  });

  it('should take a valid `inputs` as a prop', () => {
    const inputs = {
      local: 'foo',
      day: 'bar',
      month: 'baz',
      year: 'qux',
    };
    const vm = new Constructor({
      propsData: {
        inputs,
      },
    }).$mount();
    expect(vm.inputs).to.deep.equal(inputs);
  });

  it('should invalidate `input` without all needed keys', () => {
    const noLocal = { day: 'bar', month: 'baz', year: 'qux' };
    const noDay = { local: 'foo', month: 'baz', year: 'qux' };
    const noMonth = { local: 'foo', day: 'bar', year: 'qux' };
    const noYear = { local: 'foo', day: 'bar', month: 'baz' };

    const expectation = '[Vue warn]: Invalid prop: custom validator check failed for prop "inputs".\n\n(found in <Root>)';
    const consoleStub = sinon.stub(console, 'error');

    // Missing Local
    new Constructor({
      propsData: {
        inputs: noLocal,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Day
    new Constructor({
      propsData: {
        inputs: noDay,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Month
    new Constructor({
      propsData: {
        inputs: noMonth,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    // Missing Year
    new Constructor({
      propsData: {
        inputs: noYear,
      },
    }).$mount();
    expect(console.error).to.have.been.calledWith(expectation);

    consoleStub.restore();
  });
});

/*
 * datepicker.methods.t
 */
describe('Datepicker.vue - methods.t', () => {
  it('should replace items in a string', () => {
    const vm = new Constructor().$mount();

    expect(vm.t('Foo: {date}', { date: 'bar' })).to.equal('Foo: bar');
    expect(vm.t('Foo: {date}', { bar: 'baz' })).to.equal('Foo: {date}');
    expect(vm.t('Foo{date}: {date}', { date: 'bar' })).to.equal('Foobar: bar');
  });
});
