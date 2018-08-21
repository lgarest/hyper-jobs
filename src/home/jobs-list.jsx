import { h } from 'hyperapp'

import Job from './job.jsx'

const JobsList = () => ({ jobs }) => (
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
  }}>
    {jobs.splice(0, 5).map(job => <Job {...job} />)}
  </div>
)

export default JobsList
