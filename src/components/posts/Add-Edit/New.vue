<template>
    <div>
        <PostForm v-if="!$route.params.id" mode="add" />
        <PostForm v-if="$route.params.id" mode="edit"/>

    </div>
</template>

<script>
import PostForm from "./PostForm";

export default {
    name: "New",
    components: {
        PostForm
    }
};
</script>

<style scoped>
</style>


