import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'https://indreed.herokuapp.com/api/jobs/',
  responseType: 'json',
  // headers: {
  //   Accept: 'application/json',
  //   'Access-Control-Allow-Headers': '*',
  //   'Access-Control-Allow-Origin': '*',
  // },
});

// const defaultParams = ['q=web+developer', 'limit=50']

// myAxios.get({
//   method: 'get',
//   url: apiUrl,
//   // responseType: 'stream',
//   dataType: 'json',
//   params: {
//     ...params,
//     limit: 50,
//     q: 'web developer',
//   },
//   headers: {
//     Accept: 'application/json',
//   //   'Access-Control-Allow-Headers': '*',
//   //   'Access-Control-Allow-Origin': '*',
//   },
// })

const defaultParams = {
  q: 'web developer',
  max: 5,
  l: 'Barcelona',
  country: 'es',
}

export const fetchJobs = (params = Object.keys(defaultParams)
  .reduce((acc, p) => acc.concat(`${p}=${defaultParams[p]}`), []).join('&')) =>
  (state, actions) => {
    actions.updateLoading()
    myAxios.get(`?${params}`)
      .then(response => actions.updateJobs(response.data))
      .catch(error => console.error(error))
      .then(() => actions.updateLoading(false))
  }

export default {}


// https://indreed.herokuapp.com/api/jobs
// Access-Control-Allow-Origin
