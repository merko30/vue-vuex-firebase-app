import firebase from "firebase";

import router from "../../routing/routes";

export default {
    namespaced: true,
    state: {
        loggedIn: false,
        loading: false,
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.user;
            state.loggedIn = payload.logged;
        }
    },
    actions: {
        register(context, { email, password, displayName }) {
            context.commit("setLoading", true, { root: true });
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    user.user.sendEmailVerification({
                        url: "http://localhost:8080/#/"
                    });
                    user.user.updateProfile({
                        displayName: displayName
                    })
                })

                .then(() => {
                    context.commit("clearFields", ["loading", "error"], {
                        root: true
                    });
                    context.commit(
                        "setMessage",
                        "You have been registered, please verify your account.",
                        { root: true }
                    );
                    setTimeout(() => {
                        router.push("/login");
                        context.commit("clearFields", ["message"], {
                            root: true
                        });
                    }, 1500);
                })
                .catch(err => {
                    context.commit("clearFields", ["loading"], { root: true });
                    context.commit("setError", err.message, { root: true });
                });
        },
        login(context, { email, password }) {
            context.commit("setLoading", true, { root: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    context.commit("clearFields", ["loading", "error"], {
                        root: true
                    });
                    context.commit("setUser", {
                        user: user.user,
                        logged: true,
                        loading: false
                    });
                    router.push("/");
                    context.commit("clearFields", ["message"], {
                        root: true
                    });
                })
                .catch(err => {
                    context.commit("clearFields", ["loading"], { root: true });
                    context.commit("setError", err.message, { root: true });
                });
        },
        logout(context) {
            context.commit("setLoading", true, { root: true });
            return firebase
                .auth()
                .signOut()
                .then(() => {
                    context.commit(
                        "clearFields",
                        ["error", "loading", "warning"],
                        {
                            root: true
                        }
                    );
                    context.commit("setUser", {
                        user: null,
                        logged: false,
                        loading: false
                    });
                    router.push("/login");
                })
                .catch(err => {
                    context.commit("setError", err.message, { root: true });
                });
        }
    },
    getters: {
        isLoggedIn: state => state.loggedIn,
        currentUser: state => state.user
    }
};
