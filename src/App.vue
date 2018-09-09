<template>
    <div id="app">
        <Loading />
        <Navbar />
        <div class="container mt-5 mb-5">
            <div v-if="message !== null" class="mt-2 mb-4 alert alert-success">{{ message }}</div>
            <div v-if="error !== null" class="mt-2 mb-4 alert alert-danger">{{ error }}</div>
            <div v-if="warning !== null" class="mt-2 mb-4 alert alert-warning">{{ warning }}</div>
            <router-view></router-view>
        </div>
       
    </div>
</template>

<script>
import Navbar from "./components/core/Navbar.vue";
import Loading from "./components/Loading.vue";
import { mapGetters } from "vuex";

export default {
    name: "app",
    components: {
        Navbar,
        Loading
    },
    computed: {
        ...mapGetters({
            message: "message",
            error: "error",
            warning: "warning"
        })
    }
};
</script>

<style>
</style>
