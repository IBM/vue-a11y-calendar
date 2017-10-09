import Vue from 'vue';
import VueRouter from 'vue-router';
import Calendar from '@/calendar';
import Datepicker from '@/datepicker';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [{
  path: '/',
  name: 'Calendar',
  component: {
    components: {
      Calendar,
    },
    template: '<calendar></calendar>'
  },
}, {
  path: '/datepicker',
  name: 'Datepicker',
  component: {
    components: {
      Datepicker,
    },
    template: '<datepicker></datepicker>'
  },
}, {
  path: '*',
  redirect: '/',
}];

new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  router: new VueRouter({
    routes,
  }),
});
