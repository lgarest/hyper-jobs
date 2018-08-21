import { h } from 'hyperapp'
import Spinner from './spinner.jsx'
import JobsList from './jobs-list.jsx'


export default (state, actions) => (
  <div oncreate={() => actions.fetchJobs()}>
    <h1>{state.message}</h1>
    {
      state.loading
        ? <Spinner />
        : state.jobs.length !== 0
        ? <JobsList />
        : 'Oops'
    }
  </div>
)
