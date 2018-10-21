<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="section">
          <h1 class="subtitle is-3">Confirm Account</h1>
          <p class="description">
            Enter the confirmation code which was emailed to you, or click the link in your email to confirm your account.
          </p>
          <p v-if="error" class="error">{{ error.message }}</p>
          <div class="box is-clearfix">
            <form @submit.prevent="confirm">
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
                <label class="label">Confirmation Code</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your code"
                    v-model="code"
                    required
                  >
                </div>
              </div>
              <div class="field is-grouped is-pulled-left">
                <div class="control">
                  <button class="button is-link" v-if="!submitting">Confirm</button>
                  <button class="button is-link" disabled v-if="submitting">Confirming</button>
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
      username: this.$route.query.username,
      code: '',
      error: null,
      submitting: false
    }
  },
  methods: {
    confirm () {
      this.submitting = true
      this.$cognitoAuth.confirmRegistration(this.username, this.code, (err, result) => {
        this.submitting = false
        if (err) {
          this.error = err
          console.error(err)
        } else {
          this.$router.replace('/login')
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
  .description {
    padding-bottom: 20px;
  }
  .login-links {
    line-height: 35px;
  }
</style>