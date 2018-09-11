<template>
    <div id="app" >
        <Loading />
        <Navbar />
        <div class="container mt-5 mb-auto" style="flex: 1" >
            <div v-if="message !== null" class="mt-2 mb-4 alert alert-success">{{ message }}</div>
            <div v-if="error !== null" class="mt-2 mb-4 alert alert-danger">{{ error }}</div>
            <div v-if="warning !== null" class="mt-2 mb-4 alert alert-warning">{{ warning }}</div>
            <router-view ></router-view>
        
        </div>
       <Footer />
    </div>
</template>

<script>
import Navbar from "./components/core/Navbar.vue";
import Footer from "./components/core/Footer.vue";
import Loading from "./components/Loading.vue";
import { mapGetters } from "vuex";

export default {
    name: "app",
    components: {
        Navbar,
        Loading,
        Footer
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
#app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}
</style>
