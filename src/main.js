import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueSessionStorage from 'vue-sessionstorage'

const app = createApp(VueSessionStorage)


createApp(App).use(router).mount('#app')