import Vue from 'vue';
import App from './App.vue';

import VueHighlightJS from 'vue-highlightjs'
import VueClipboard from 'vue-clipboard2';

Vue.use(VueHighlightJS);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
