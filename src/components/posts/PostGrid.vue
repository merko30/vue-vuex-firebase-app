<template>
    <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-6 mb-2" v-for="post in posts" :key="post.id">
                <router-link
                    :to="'posts/' + post.id"
                    class="card" 
                    :style="{background: 'url('+post.image+') center no-repeat!important'}">
                        <div class="card-body">
                            <h5 class="card-title">{{post.title}}</h5>
                            <p class="small">{{ formatDate(post.created_at)}} by {{post.authorName}}</p>
                        </div>
                </router-link>
        </div>
        
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    name: "PostGrid",
    computed: {
        ...mapGetters("post", { posts: "posts", filtered: "filtered" })
    },
    methods: {
        formatDate(date) {
            let splited = date.split(" ");
            let d = splited.slice(1).join(" ");
            return d;
        }
    }
};
</script>

<style scoped>
.card {
    background-size: cover !important;
    position: relative !important;
    height: 13rem;
}

.card-body {
    position: absolute !important;
    bottom: 0 !important;
    left: 0;
    background-color: rgba(0, 0, 0, 0.11);
    right: 0;
}

.small {
    margin: 0;
}

a {
    color: black !important;
}
</style>

