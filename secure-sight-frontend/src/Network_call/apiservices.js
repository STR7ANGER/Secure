import Axios from 'axios';

const axiosInstance = Axios.create();

axiosInstance.interceptors.request.use(
	(config) => {
		let token = window.sessionStorage.getItem("@userToken");
		config.headers = { 'Access-Control-Allow-Origin': '*' };
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		console.log('request error =>', error.response || error)
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.response.use(
	(config) => {

		return config
	},
	(error) => {
		console.log('response error =>', error.response || error)
		return Promise.reject(error)
	},
)

const getFormData = (object) => {
	const formData = new FormData()
	Object.keys(object).forEach((key) => formData.append(key, object[key]))
	return formData
}
const ApiServices = async (
	method = 'post',
	body,
	url = '',
	headers = { 'Access-Control-Allow-Origin': '*' },
	formData = false,
	redirectRoute = "",
	isShowMessage = false
) => {
	const config = {
		method: method.toLowerCase(),
		timeout: 1000 * 60 * 2,
	}
	if (url) {
		config.url = url
	}
	if (body && (method.toLowerCase() === 'get')) {
		config.params = body
	} else if (body && method.toLowerCase() === 'post' && !formData) {
		config.data = body
	} else if (body && method.toLowerCase() === 'post' && formData) {
		config.data = getFormData(body)
	} else {
		config.data = body
	}
	if (headers) {
		config.headers = headers
	}
	let token = window.sessionStorage.getItem("@userToken");
	if (token) {
		config.headers.Authorization = token;
	}
	return new Promise((resolve) => {
		axiosInstance(config)
			.then(async (res) => {
				let response = res.data
				resolve(response);
			})
			.catch(async (error) => {
				if (error.response) {

					if (error.response.status === 409) {
						alert(error.response.data.message);
					}

					if (error.response.status === 502 || error.response.status === 404) {
						// Utility.showToast('Something went wrong, Please try again later.')
					}
					// if (error.response.data?.message) {
					//   // Utility.showToast(error.response.data.message)
					// }
					// resolve({
					//   status: error.response.status,
					//   data: error.response.data,
					//   data: error.response.data,
					// })          
					resolve(error.response.data);
					return
				}
				if (error.code === 'ECONNABORTED') {
					// Utility.showToast('Request timeout. Please check your internet connection')
					resolve({ status: 400 })
					return
				}
				// Utility.showToast('Something went wrong, Please try again later.')
				resolve({ status: 400 })
			})
	})
}

export default ApiServices;
