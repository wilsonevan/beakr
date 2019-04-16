import React from 'react';
import axios from 'axios';
import Code from './Code';
import { Link } from 'react-router-dom';
import { Segment, Header, Icon, Divider } from 'semantic-ui-react';

class SubmissionView extends React.Component {
  state = { body: '', url: '', code: '', assignment: {}, user: {} }

  componentDidMount() {
    const { assignment_id, id } = this.props.match.params
    axios.get(`/api/assignments/${assignment_id}`)
      .then( res => {
        this.setState({ assignment: res.data })
      })
    axios.get(`/api/assignments/${assignment_id}/assignment_submissions/${id}`)
      .then( res => {
        this.setState({ body: res.data.body, url: res.data.url, code: res.data.code })
      })
    axios.get(`/api/assignments/${assignment_id}/assignment_submissions/${id}/find_user`)
      .then( res => {
        this.setState({ user: res.data })
      })
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  renderSubmission = () => {
    const { assignment, body, url, code } = this.state
    switch(assignment.kind) {
      case 'url':
        return (
          <>
            <div>
              <a target="_blank" href={url}>{url}</a>
            </div>
            <div 
            dangerouslySetInnerHTML=
            {this.createMarkup(body)}
            style={{padding: '15px'}}
            />
          </>
        )
      case 'code':
        return (
          <Code value={code} />
        )
      case 'none':
        return (
          <div 
            dangerouslySetInnerHTML=
            {this.createMarkup(body)}
            style={{padding: '15px'}}
          />
        )
      default:
        break
    };
  }

  render() {
    const { assignment, user } = this.state

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Back' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {assignment.title} Submission for {user.first_name} {user.last_name}
        </Header>
        <Segment>
          <div 
            dangerouslySetInnerHTML=
            {this.createMarkup(assignment.body)}
            style={{padding: '15px'}}
          />
          <Divider />
            {this.renderSubmission()}
        </Segment>
      </>
    )
  }
}

export default SubmissionView