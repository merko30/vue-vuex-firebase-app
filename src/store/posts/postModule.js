import firebase from "firebase";

import { db } from "../../main";

import router from "../../routing/routes";

export default {
    namespaced: true,
    state: {
        posts: [],
        filtered: [],
        post: null
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        },
        setPost(state, payload) {
            state.post = payload;
        }
    },
    actions: {
        getPosts(context) {
            let postsCollection = db.collection("posts");

            let posts = [];

            postsCollection.get().then(snap => {
                snap.forEach(d => {
                    let post = d.data();
                    post.id = d.id;
                    posts.push(post);
                });
                context.commit("setPosts", posts);
            });
        },
        getPostById(context, payload) {
            context.commit("setLoading", true, { root: true });
            let posts = Object.values(Object.assign({}, context.state.posts));
            let post = posts.find(p => p.id == payload);
            context.commit("setPost", post);
            context.commit("clearFields", ["loading"], { root: true });
        },
        add(context, data) {
            context.commit("clearFields", ["error"], { root: true });
            context.commit("setLoading", true, { root: true });
            let postsCollection = db.collection("posts");

            var storageRef = firebase
                .storage()
                .ref("images")
                .child(new Date() + data.image.name);
            var task = storageRef.put(data.image);

            task.on("state_changed", snapshot => {
                var percentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (percentage == 100) {
                    storageRef
                        .getDownloadURL()
                        .then(function(url) {
                            let date = new Date();
                            postsCollection.add({
                                title: data.title,
                                content: data.content,
                                created_at: date.toDateString(),
                                authorID: data.authorID,
                                authorName: data.authorName,
                                image: url
                            });
                        })
                        .then(() => {
                            context.commit("clearFields", ["loading"], {
                                root: true
                            });
                            router.push("/");
                        })
                        .catch(error => {
                            context.commit("clearFields", ["loading"], {
                                root: true
                            });
                            context.commit("setError", error.message, {
                                root: true
                            });
                        });
                }
            });
        },
        edit(context, data) {
            context.commit("clearFields", ["error"], { root: true });
            context.commit("setLoading", true, { root: true });
            let postCollection = db.collection("posts");
            postCollection
                .doc(data.id)
                .update({
                    title: data.title,
                    content: data.content
                })
                .then(() => {
                    context.commit("setMessage", "Post updated", {
                        root: true
                    });
                    setTimeout(() => {
                        router.push("/posts");
                        context.commit("clearFields", ["loading", "message"], {
                            root: true
                        });
                    });
                });
        }
    },
    getters: {
        posts: state => state.posts,
        post: state => state.post,
        filtered: state => state.filtered
    }
};
