import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth/authModule";
import post from "./posts/postModule";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        post
    },
    state: {
        loading: false,
        message: null,
        warning: null,
        error: null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setMessage(state, payload) {
            state.message = payload;
        },
        setWarning(state, payload) {
            state.warning = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearFields(state, arr) {
            arr.map(field => {
                if (field == "loading") {
                    state[field] = false;
                } else {
                    state[field] = null;
                }
            });
        }
    },
    getters: {
        isLoading: state => state.loading,
        warning: state => state.warning,
        error: state => state.error,
        message: state => state.message
    }
});
