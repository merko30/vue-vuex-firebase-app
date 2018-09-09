<template>
    <div class="col-lg-10 col-md-10 col-sm-10 mx-auto" v-if="post">
        <h4>{{ post.authorName }}</h4>
        <p>created at {{ post.created_at}}</p>
        <img :src="post.image" class="image-responsive img">
        <h3 class="mb-3 mt-3">{{post.title}}</h3>
        <p v-html="post.content"></p>
        <router-link :to="{ name:'edit', params: { post: post } }" v-if="currentUser.uid == post.authorID" class="btn-small">edit</router-link>
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "PostDetail",
    computed: {
        ...mapGetters("post", { post: "post", posts: "posts" }),
        ...mapGetters("auth", { currentUser: "currentUser" })
    },
    methods: {
        ...mapActions("post", {
            getPosts: "getPosts",
            getPostById: "getPostById"
        })
    },
    created() {
        this.getPosts();
        this.$store.watch(
            () => this.$store.getters["post/posts"],
            posts => {
                if (posts.length > 0) {
                    this.getPostById(this.$route.params.id);
                }
            }
        );
    }
};
</script>


<style scoped>
.img {
    max-width: 100%;
    object-fit: cover;
}
</style>

