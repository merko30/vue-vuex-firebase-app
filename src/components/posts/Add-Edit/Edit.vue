<template>
    <div>
        <PostForm mode="edit"/>
        <PostForm mode="add"/>

    </div>
</template>

<script>
import PostForm from "./PostForm";

export default {
    name: "Edit",
    components: {
        PostForm
    }
};
</script>

<style scoped>
</style>


