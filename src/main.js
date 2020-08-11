import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import router from './router'
import moment from 'moment';

Vue.use(Buefy)

Vue.config.productionTip = false

moment.locale('ko');

Vue.filter('mediumDate', value => {
  if (value) {
    if (typeof (value) === 'object') {
      return value.toISOString().substr(0, 10);
    }
    return moment(String(value)).format('YYYY-MM-DD');
  }
});

Vue.filter('timeStampDate', value => {
  if (value) {
       return moment(String(value)).format('YYYY-MM-DD');
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
