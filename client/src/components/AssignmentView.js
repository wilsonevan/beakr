import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../providers/AuthProvider';
import { Segment, Header, Icon, } from 'semantic-ui-react';
import AssignmentSubmissionForm from './AssignmentSubmissionForm';

class AssignmentView extends React.Component {
  state = { title: '', body: '', due_date: '', kind: '', submissions: [], }

  componentDidMount() {
    const { user } = this.props.auth
    const { id } = this.props.match.params
    axios.get(`/api/assignments/${id}`)
      .then( res => {
        this.setState( res.data )
      })
    if (user.admin) {
    axios.get(`/api/assignments/${id}/assignment_submissions`)
      .then( res => {
        // this.setState({ submissions: res.data })
        res.data.map( (submission) => {
          axios.get(`/api/assignments/${id}/assignment_submissions/${submission.id}/find_user`)
            .then( res => {
              this.setState({ submissions: [...this.state.submissions, {...submission, user: res.data}] })
            })
        })
      })
    }
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  renderAdminView = () => {
    const { id } = this.props.match.params
    return this.state.submissions.map((submission, index) => {
      return (
        <Link
          to={`/assignments/${id}/submissions/${submission.id}`}
          key={index}
        >
          <div>
            {submission.user.first_name} {submission.user.last_name}
          </div>
        </Link>
      );
    });
  };

  renderStudentView = () => {
    const { match, history, auth } = this.props
    return (
      <AssignmentSubmissionForm kind={this.state.kind} assignment_id={match.params.id} history={history} user={auth.user} courseId={this.props.match.params.course_id}/>
    )
  }

  render() {
    const { title, body, due_date, } = this.state;
    const { auth: { user, } } = this.props;
    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
          <Header style={{ color: '#23A24D' }}>
            <Icon name='block layout' color='green' />
              {title}
          </Header>
          <Moment format='ddd, MMM D, LT' date={due_date} />
        <Segment>
          <div 
            dangerouslySetInnerHTML=
            {this.createMarkup(body)}
            style={{padding: '15px'}}
          />
          { user.admin ?
            <>
              {this.renderAdminView()}
            </>
          :
            <>
              {this.renderStudentView()}
            </>
          }
        </Segment>
      </>
    )
  }
}

class connectAssignmentView extends React.Component {
  render(){
    return(
      <AuthConsumer>
        {auth => <AssignmentView {...this.props} auth={auth}/>}
      </AuthConsumer>
      )
    }
  }

export default connectAssignmentView