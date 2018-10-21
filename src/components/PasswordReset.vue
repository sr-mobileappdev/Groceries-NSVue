<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="section">
          <h1 class="subtitle is-3">Password Reset</h1>
          <p v-if="error" class="error">{{ error.message }}</p>
          <div class="box is-clearfix">
            <form @submit.prevent="passwordReset">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your email"
                    v-model="email"
                    required
                  >
                </div>
              </div>
              <div class="field is-grouped is-pulled-left">
                <div class="control">
                  <button class="button is-link" v-if="!submitting">Reset</button>
                  <button class="button is-link" disabled v-if="submitting">Resetting</button>
                </div>
              </div>
              <p class="is-pulled-right login-links">
                <router-link to="/login">Back to Login</router-link>
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
      email: '',
      error: null,
      submitting: false
    }
  },
  methods: {
    passwordReset () {
      this.submitting = true
      this.$cognitoAuth.forgotPassword(this.email, (err, result) => {
        this.submitting = false
        if (err) {
          this.error = err
          console.error(err)
        } else {
          this.$router.replace('/confirm_reset_password')
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
