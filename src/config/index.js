/* aws cognito config */

var config = {}
var cognitoConfig = {}

cognitoConfig = {
  localhost: {
    region: 'us-east-1',
    IdentityPoolId: '760487953959',
    UserPoolId: 'us-east-1_bLnfKlELE',
    ClientId: '3iefnospv38dju8pon0h2n06gj'
  },
  "mission-test.20daily.com": {
    region: 'us-east-1',
    IdentityPoolId: '760487953959',
    UserPoolId: 'us-east-1_bLnfKlELE',
    ClientId: '3iefnospv38dju8pon0h2n06gj'
  },
  "mission.20daily.com": {
    region: 'us-east-1',
    IdentityPoolId: '760487953959',
    UserPoolId: 'us-east-1_ZY67gOLS6',
    ClientId: '7pm33njk7kcqnjgb4bh7dene2r'
  }
}

/*
if (process.env.NODE_ENV !== 'production') {
  config = {
    region: 'us-east-1',
    IdentityPoolId: '760487953959',
    UserPoolId: 'us-east-1_bLnfKlELE',
    ClientId: '3iefnospv38dju8pon0h2n06gj'
  }
} else {
  console.log('prod');
  config = {
    region: 'us-east-1',
    IdentityPoolId: '760487953959',
    UserPoolId: 'us-east-1_bLnfKlELE',
    ClientId: '3iefnospv38dju8pon0h2n06gj'
  }
}
*/


config.options = {
  endpoints: {
    localhost: {
      campaigns: "http://localhost:8393"
    },
    "mission-test.20daily.com": {
      campaigns: "https://api-dashboard-test.20daily.com"
    },
    "mission.20daily.com": {
      campaigns: "https://api-dashboard.20daily.com"
    }
  }
}

// environment value
config.license = "Evaluation_License_Valid_Until__30_September_2018__MTUzODI2MjAwMDAwMA==b0211b0a791ee130b75eaa29a676124a";
config.region = cognitoConfig[document.domain].region
config.IdentityPoolId = cognitoConfig[document.domain].IdentityPoolId
config.UserPoolId = cognitoConfig[document.domain].UserPoolId
config.ClientId = cognitoConfig[document.domain].ClientId
config.endpoints = config.options.endpoints[document.domain];

export default config
