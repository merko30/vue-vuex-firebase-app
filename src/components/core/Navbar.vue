<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/"  class="navbar-brand">VueFire</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
            <router-link to="/login"  v-if="!isLoggedIn" class="nav-item nav-link ">Login</router-link>
            <router-link to="/register" v-if="!isLoggedIn" class="nav-item nav-link ">Register</router-link>
            <router-link to="/new" v-if="isLoggedIn" class="nav-item nav-link ">Add new post</router-link>
            <a @click="logout" style="cursor: pointer;" v-if="isLoggedIn" class="nav-item nav-link ">Logout</a>
            </div>
        </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Navbar",
    computed: {
        ...mapGetters("auth", { isLoggedIn: "isLoggedIn" })
    },
    methods: {
        ...mapActions("auth", { logout: "logout" })
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
