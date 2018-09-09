<template>
    <div>
        
        <div class="row mt-5">
            <div class="col-lg-6 col-sm-8 mx-auto">
                <form @submit.prevent="signUp({displayName, email, password,confirm_password})">
                    <div class="form-group">
                        <label for="displayName">Display Name</label>
                        <input type="text" class="form-control" v-model="displayName">
                        <div class="invalid-feedback" v-if="errors.displayName">
                        {{ errors.displayName }}
                          </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="text" class="form-control" v-model="email">
                        <div class="invalid-feedback" v-if="errors.email">
                        {{ errors.email }}
                          </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" v-model="password">
                        <div class="invalid-feedback" v-if="errors.password">
                        {{ errors.password }}
                          </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm_password">Confirm password</label>
                        <input type="password" class="form-control" v-model="confirm_password">
                        <div class="invalid-feedback" v-if="errors.confirm_password">
                        {{ errors.confirm_password }}
                        </div>
                    </div>

                   

                    <button class="btn btn-light btn-large btn-block" type="submit">Sign Up</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Register",
    data() {
        return {
            displayName: "",
            email: "",
            password: "",
            confirm_password: "",
            errors: {}
        };
    },
    methods: {
        ...mapActions("auth", ["register"]),
        transformToNormalObject(observerObject) {
            return JSON.parse(JSON.stringify(observerObject));
        },
        validate(data) {
            this.errors = {};
            Object.entries(data).map(field => {
                if (field[1] == "") {
                    this.$set(this.errors, field[0], "Can't be blank");
                } else if (
                    data.password !== "" &&
                    field[0] == "confirm_password" &&
                    field[1] !== data.password
                ) {
                    this.$set(this.errors, field[0], "Passwords don't match");
                }
            });
            //return errors;
        },
        signUp(data) {
            this.validate(data);
            if (Object.keys({ ...this.errors }).length == 0) {
                this.register(data);
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