<template>
  <div
    class="section"
    :class="{'menu-open': menuOpen}"
  >
    <div class="columns is-centered">
      <div class="column is-6">
        <h1 class="subtitle is-3">Manage Your Account</h1>
        <p v-if="error" class="error">{{ error.message }}</p>
        <div class="box is-clearfix">
          <h1 class="subtitle is-5">Personal Info</h1>
          <form @submit.prevent="updateDetails">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your first name"
                  v-model="firstName"
                  required
                >
              </div>
            </div> 
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Enter your last name"
                  v-model="lastName"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="Enter your email"
                  v-model="email"
                  required
                >
              </div>
            </div>
            <div class="field is-grouped is-pulled-left">
              <div class="control">
                <button class="button is-link" v-if="!submitting">Update</button>
                <button class="button is-link" disabled v-if="submitting">Updating</button>
              </div>
            </div>
          </form>
        </div>

        <p v-if="passError" class="error">{{ passError.message }}</p>
        <div class="box is-clearfix">
          <h1 class="subtitle is-5">Change Password</h1>
          <form @submit.prevent="passwordChange">
            <div class="field">
              <label class="label">Current Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="Enter your password"
                  v-model="oldPass"
                  required
                >
              </div>
            </div> 
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="Enter your new password"
                  v-model="newPass"
                  required
                >
              </div>
            </div>
             <div class="field is-grouped is-pulled-left">
              <div class="control">
                <button class="button is-link" v-if="!submittingPass">Update</button>
                <button class="button is-link" disabled v-if="submittingPass">Updating</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        oldPass: '',
        newPass: '',
        error: null,
        passError: null,
        submitting: false,
        submittingPass: false
      }
    },
    computed: {
      ...mapState({
        menuOpen: (state) => state.app_state.menuOpen
      })
    },
    mounted () {
      this.$cognitoAuth.getUserDetails((err, result) => {
        if (err) {
          console.error(err)
        } else {
          let given_name = result.find((r) => {
            return r.Name == 'given_name'
          })
          if (given_name)
            this.firstName = given_name.Value
          let family_name = result.find((r) => {
            return r.Name == 'family_name'
          })
          if (family_name)
            this.lastName = family_name.Value
          let email = result.find((r) => {
            return r.Name == 'email'
          })
          if (email)
            this.email = email.Value
        }
      })
    },
    methods: {
      updateDetails () {
        this.submitting = true
        this.$cognitoAuth.updateUserDetails(this.firstName, this.lastName, this.email, (err, result) => {
          this.submitting = false
          if (err) {
            this.error = err
            console.error(err)
          }
        })
      },
      passwordChange () {
        this.submittingPass = true
        this.$cognitoAuth.changePassword(this.oldPass, this.newPass, (err, result) => {
          this.submittingPass = false
          if (err) {
            this.passError = err
            console.error(err)
          } else {
            console.log('Password change successful:', result)
            //this.$router.replace('/')
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
  @media screen and (min-width: 900px) {
    .section {
      transition: padding 0.3s;
      &.menu-open {
        padding-left: 300px;
      }
    }
  }
</style>
