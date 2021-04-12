<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="name"
        append-icon="mdi-account"
        :rules="[rules.required]"
        label="User name"
      ></v-text-field>
      <span v-if="nameError">{{ nameError }}</span>
      <v-text-field
        v-model="email"
        append-icon="mdi-email"
        :rules="[rules.required, rules.email]"
        label="Email"
      ></v-text-field>
      <span v-if="emailError">{{ emailError }}</span>
      <v-text-field
        v-model="password"
        type="password"
        :rules="[rules.required, rules.password]"
        append-icon="mdi-key"
        name="password"
        label="Password"
      ></v-text-field>
      <span v-if="pswdError">{{ pswdError }}</span>
      <v-btn class="mr-4" type="submit" > submit </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      name: "",
      email: "",
      errorMessages: "",
      password: "",
      nameError: null,
      emailError: null,
      pswdError: null,
      rules: {
        required: (value) => !!value || "必須項目です",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "メールアドレスを確認してください";
        },
        password: (value) => {
            return  (value && value.length >= 6) || "パスワードは6文字以上にしてください"
        }
      },
    };
  },
  methods: {
    submit(e) {
        e.preventDefault();
        
        if(!this.name || !this.email || !this.password) {
             this.nameError = "必須項目です"
             this.email = "必須項目です"
             this.password = "必須項目です"
        }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>