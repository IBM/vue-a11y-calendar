import Vue from 'vue';
import VueRouter from 'vue-router'; // eslint-disable-line import/no-extraneous-dependencies
import Calendar from '@/calendar'; // eslint-disable-line import/no-unresolved, import/extensions
import Datepicker from '@/datepicker'; // eslint-disable-line import/no-unresolved, import/extensions

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [{
  path: '/',
  name: 'Calendar',
  component: {
    components: {
      Calendar,
    },
    template: '<calendar></calendar>',
  },
}, {
  path: '/datepicker',
  name: 'Datepicker',
  component: {
    components: {
      Datepicker,
    },
    template: '<datepicker></datepicker>',
  },
}, {
  path: '/datepicker/range',
  name: 'Range Datepicker',
  component: {
    components: {
      Datepicker,
    },
    template: '<datepicker type="range"></datepicker>'
  },
}, {
  path: '*',
  redirect: '/',
}];

new Vue({ // eslint-disable-line no-new
  el: '#app',
  template: '<router-view></router-view>',
  router: new VueRouter({
    routes,
  }),
});
