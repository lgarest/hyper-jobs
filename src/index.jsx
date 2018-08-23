import { h, app } from 'hyperapp'

import Home from './home'

import { fetchJobs } from './honeycomb'


const state = {
  message: 'Find me a job',
  notification: '',
  loading: false,
  jobs: [],
}

const actions = {
  log: a => console.log(a),
  updateLoading: (loadingStatus = true) => () => ({
    loading: loadingStatus,
  }),
  showNotification: notification => ({ notification }),
  updateJobs: (jobs = []) => ({ jobs }),
  fetchJobs,
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./find-me-a-job-service-worker.js');
}

app(state, actions, Home, document.body)
