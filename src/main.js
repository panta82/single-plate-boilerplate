import Vue from 'vue';
import App from './components/App.vue';

import VueHighlightJS from 'vue-highlightjs';
import VueClipboard from 'vue-clipboard2';
import VueSelect from 'vue-select';

import Store from './lib/store';

Vue.use(VueHighlightJS);
Vue.use(VueClipboard);

Vue.component('v-select', VueSelect);

Vue.config.productionTip = false;

Vue.prototype.$store = new Store();

new Vue({
	render: h => h(App)
}).$mount('#app');
