import Vue from "vue";
import firebase from "firebase";

Vue.config.productionTip = false;

import VueRouter from "vue-router";
import VueResource from "vue-resource";

import App from "./App.vue";

import { store } from "./store/store";
import router from "./routing/routes";

import config from "./firebase";

Vue.use(VueRouter);
Vue.use(VueResource);

firebase.initializeApp(config);

const settings = { timestampsInSnapshots: true };

export const db = firebase.firestore();

firebase.firestore().settings(settings);

firebase.auth().onAuthStateChanged(function(user) {
    store.commit("setLoading");
    if (user) {
        if (!user.emailVerified) {
            store.commit("setWarning", "Please verify your account.");
        }
        store.commit("auth/setUser", {
            user: user,
            logged: true,
            loading: false
        });
    }
    store.commit("clearFields", ["loading"]);

    new Vue({
        render: h => h(App),
        store,
        router
    }).$mount("#app");
});
