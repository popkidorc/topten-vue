import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import VueCookies from 'vue-cookies';
import router from './router';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
 

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(VueCookies);


app.use(router);
app.mount('#app');
