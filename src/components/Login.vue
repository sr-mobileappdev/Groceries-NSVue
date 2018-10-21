<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="section">
          <h1 class="subtitle is-3">Log In</h1>
          <div class="alert alert-danger" v-if="error">
            <p v-if="error" class="error">{{ error.message }}</p>
          </div>
          <div class="box is-clearfix">
            <form @submit.prevent="login">
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your username"
                    v-model="username"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Enter your password"
                    v-model="pass"
                    required
                  >
                </div>
              </div>
              <div class="field is-grouped is-pulled-left">
                <div class="control">
                  <button class="button is-link" v-if="!submitting">Submit</button>
                  <button class="button is-link" disabled v-if="submitting">Submitting</button>
                </div>
              </div>
              <p class="is-pulled-right login-links">
                <router-link to="/signup">Create an account</router-link>
                or
                <router-link to="/reset_password">reset password</router-link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      pass: '',
      error: null,
      submitting: false
    }
  },
  methods: {
    login () {
      this.submitting = true
      this.$cognitoAuth.signin(this.username, this.pass, (err, result) => {
        this.submitting = false
        if (err) {
          this.error = err
          console.error(err)
        } else {
          this.$router.replace(this.$route.query.redirect || '/campaigns')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .error {
    color: red;
    padding-bottom: 20px;
  }
  .login-links {
    line-height: 35px;
  }
</style>
