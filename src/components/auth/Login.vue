<template>
    <div>
        
        <div class="row mt-5">
            <div class="col-lg-6 col-sm-8 mx-auto">
                <form @submit.prevent="submit(data)">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="text" class="form-control"  v-model="data.email">
                        <div class="invalid-feedback" v-if="errors.email">
                        {{ errors.email }}
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" v-model="data.password">
                        <div class="invalid-feedback" v-if="errors.password">
                        {{ errors.password }}
                        </div>
                    </div>
                    <button class="btn btn-light btn-large btn-block" type="submit">Sign In</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            data: {
                email: "",
                password: ""
            },
            errors: {}
        };
    },
    methods: {
        ...mapActions("auth", ["login"]),

        validate(data) {
            this.errors = {};
            Object.entries(data).map(field => {
                if (field[1] == "") {
                    this.$set(this.errors, field[0], "Can't be blank");
                }
            });
        },
        submit(data) {
            this.validate(data);
            if (Object.keys({ ...this.errors }).length == 0) {
                this.login(data);
            }
        }
    }
};
</script>

<style scoped>
.invalid-feedback {
    display: block;
}
</style>