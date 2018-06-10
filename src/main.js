import Vue from 'vue';
import App from './App.vue';

import VueHighlightJS from 'vue-highlightjs';
import VueClipboard from 'vue-clipboard2';
import VueSelect from 'vue-select';

Vue.use(VueHighlightJS);
Vue.use(VueClipboard);

Vue.component('v-select', VueSelect);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount('#app');
