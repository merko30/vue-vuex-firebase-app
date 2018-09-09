import VueRouter from "vue-router";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import New from "../components/posts/Add-Edit/New";

import PostDetail from "../components/posts/PostDetail";

import Home from "../components/core/Home";

import { store } from "../store/store";

let router = new VueRouter({
    routes: [
        { path: "/", component: Home, alias: "/posts" },
        { path: "/login", component: Login, meta: { guest: true } },
        { path: "/register", component: Register, meta: { guest: true } },
        {
            path: "/new",
            component: New,
            meta: {
                requiresAuth: true
            }
        },
        { path: "/:id", component: PostDetail },
        {
            path: "/:id/edit",
            name: "edit",
            component: New,
            meta: {
                matchToAuthor: true,
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.matchToAuthor)) {
        let user = store.getters["auth/currentUser"];
        let author = store.getters["post/post"].authorID;
        if (user.uid && author) {
            if (user.uid == author) {
                next();
            } else {
                next({ path: "/" });
            }
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["auth/isLoggedIn"]) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters["auth/isLoggedIn"]) {
            next({
                path: "/posts"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
