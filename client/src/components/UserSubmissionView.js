import React from 'react';
import axios from 'axios';
import Code from './Code';
import { Divider } from 'semantic-ui-react';

class SubmissionView extends React.Component {
  state = { body: '', url: '', code: '', kind: '', }

  componentDidMount() {
    const { course_id, assignment_id, kind } = this.props
    axios.get(`/api/courses/${course_id}/assignments/${assignment_id}/assignment_submissions/show_user_submission`)
        .then( res=> {
          this.setState({ ...res.data, kind })
    })
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  renderSubmission = () => {
    const { kind, body, url, code } = this.state
    switch(kind) {
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
          <>
            <Code value={code} />
            <div 
              dangerouslySetInnerHTML=
              {this.createMarkup(body)}
              style={{padding: '15px'}}
            />
          </>
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
    return (
      <>
        <Divider />
        {this.renderSubmission()}
      </>
    )
  }
}

export default SubmissionView