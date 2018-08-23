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

/*
  Register the service worker in production environments
 */
process.env.NODE_ENV === 'production'
  && navigator.serviceWorker
  && navigator.serviceWorker
    .register('./find-me-a-job-service-worker.js')
    .then((reg) => {
      // check if there is any updates on the sw registration
      // triggered when the new sw is different than the previous one
      reg.onupdatefound = () => {
        const sw = reg.installing

        actions.log(sw)

        sw.onstatechange = () => {
          // case sw just installed and content is cached
          if (sw.state === 'installed') {
            actions.showNotification('Service worker install')
            if (navigator.serviceWorker.controller) {
              // if there is a controller, then we had a sw previously
              // new version
              actions.showNotification('new sw version detected')
            } else {
              // contents are cached
              actions.showNotification('contents are being cached')
            }
          }
        }
      }
    })


app(state, actions, Home, document.body)