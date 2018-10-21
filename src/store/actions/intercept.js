import axios from 'axios';

import cognitoAuth from '@/cognito'
import config from '@/config'

axios.interceptors.request.use(async function(config) {
	// const token = this.$store.state.token;
	// console.log("Intercept1", config);
	// let accessToken = localStorage.getItem("accessToken");
	// config.headers.Authorization = accessToken;

	const accessToken = await new Promise((resolve, reject) => {
		cognitoAuth.getIdToken((err, token) => {
			resolve(token)
		});
	});

	// console.table({ accessToken })

	// set cognito jwt access token
	config.headers.Authorization = accessToken;

	// approve config
	return config
	
}, function(err){
	return Promise.reject(err)
});     