<template>
    <div>
        <PostGrid />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostGrid from "../posts/PostGrid";

export default {
    name: "Home",
    components: {
        PostGrid
    },
    computed: {
        ...mapGetters("auth", { currentUser: "currentUser" })
    },
    methods: {
        ...mapActions(["clearFields"]),
        ...mapActions("post", { getPosts: "getPosts" })
    },
    created() {
        if (this.currentUser && this.currentUser.emailVerified) {
            this.$store.commit("clearFields", ["warning"]);
        }
        this.getPosts();
    }
};
</script>

<style scoped>
</style>


