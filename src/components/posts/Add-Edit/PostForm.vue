<template>
    
    <div class="row">
        <div class="col-lg-8 col-sm-8 mx-auto">
            <form @submit.prevent="submit(data)">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control"  v-model="data.title">
                    <div class="invalid-feedback" v-if="errors.title">
                        {{ errors.title }}
                        </div>
                </div>
                <div class="form-group">
                    <label for="content">Content</label>
                    <VueEditor v-model="data.content" />
                    <div class="invalid-feedback" v-if="errors.content">
                        {{ errors.content }}
                            </div>
                </div>
                <div class="form-group" v-if="$props.mode !== 'edit'">
                    <label for="image">Post image</label>
                    <input type="file" class="form-control-file" @change="processFile($event)">
                    <div class="invalid-feedback" v-if="errors.image">
                        {{ errors.image }}
                          </div>
                </div>

                
                
                <button class="mt-5 btn btn-block btn-outline-warning" type="submit">{{$props.mode == 'edit' ? 'Edit Post' : 'Add post'}}</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
    name: "PostForm",
    components: {
        VueEditor
    },
    props: ["mode"],
    data() {
        return {
            data: {
                title: "",
                content: "",
                image: {}
            },
            imageLink: "",
            errors: {}
        };
    },
    computed: {
        ...mapGetters("auth", { currentUser: "currentUser" }),
        ...mapGetters("post", { post: "post" })
    },
    created() {
        if (this.$props.mode == "edit") {
            (this.data.title = this.$route.params.post.title),
                (this.data.content = this.$route.params.post.content);
        }
    },
    methods: {
        ...mapActions("post", {
            add: "add",
            getPostById: "getPostById",
            edit: "edit"
        }),
        validate(data) {
            this.errors = {};
            Object.entries(data).map(field => {
                if (field[0] !== "image" && field[1] == "") {
                    this.$set(this.errors, field[0], "Can't be blank");
                } else if (
                    this.$props.mode == "edit" &&
                    field[0] == "image" &&
                    (Object.keys(field[0]).length == 0 || field[1] == null)
                ) {
                    this.$set(this.errors, field[0], "Please, add post image");
                } else if (field[0] == "content" && field[1].length < 250) {
                    this.$set(
                        this.errors,
                        field[0],
                        "Content must be longer than 250 characters"
                    );
                }
            });
        },
        submit(data) {
            this.validate(data);
            if (Object.keys({ ...this.errors }).length == 0) {
                if (this.$props.mode !== "edit") {
                    this.add({
                        ...data,
                        authorID: this.currentUser.uid,
                        authorName: this.currentUser.displayName
                    });
                } else {
                    this.edit({
                        title: this.data.title,
                        content: this.data.content,
                        id: this.$route.params.post.id
                    });
                }
            }
        },
        processFile(event) {
            this.data.image = event.target.files[0];
        }
    }
};
</script>

<style scoped>
.invalid-feedback {
    display: block;
}
</style>
