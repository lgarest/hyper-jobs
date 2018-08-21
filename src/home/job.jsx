import { h } from 'hyperapp'

const style = {
  border: '1px solid black',
  backGroundColor: 'papayawhip',
  padding: '1rem 1rem 2.5rem',
  position: 'relative',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '320px',
  margin: '0.5rem',
  boxSizing: 'border-box',
  // maxWidth: 'calc(50vw - 1.5rem)',
}

const Span = (_, children) => <span style={{
  display: 'block',
}}>{children}</span>

const Em = (_, children) => <em style={{
  fontStyle: 'normal',
  fontWeight: 'bolder',
}}>{children}</em>

const MoreInfoBtn = ({ url }, children) => <button style={{
  position: 'absolute',
  right: '0',
  bottom: '0',
  padding: '0.5em',
  border: '1px solid aliceblue',
  backgroundColor: 'greenyellow',
  borderRadius: '2px',
  textSize: '2rem',
  width: '10rem',
  // minWidth: '10rem',
  // maxWidth: '100%',
  // maxHeight: '2.5rem',
  height: '2.5rem',
}} onclick={() => window.open(url)}><span>{children}</span></button>

const PostedLabel = (_, children) => <span style={{
  position: 'absolute',
  right: 'calc(0rem - 2px)',
  top: 'calc(0rem - 2px)',
  padding: '0.25em',
  border: '1px solid aliceblue',
  backgroundColor: 'blueviolet',
  borderRadius: '2px',
  color: 'white',
}}>{children}</span>

const Job = ({
  title, company, location, summary, date, url,
}) => (
  <div style={style}>
    <h2><strong>{title}</strong></h2>
    <Span><Em>{company}</Em> ({location})</Span>
    <Span>{summary}</Span>
    <PostedLabel>{date}</PostedLabel>
    <MoreInfoBtn url={url}>+ info</MoreInfoBtn>
  </div>
)

export default Job
