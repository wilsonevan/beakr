import React from 'react'
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import { AuthConsumer } from '../../providers/AuthProvider';

class Dashboard extends React.Component {
  render() {
    const { auth: { user, }, } = this.props;
  
    return (
      <>
        { user.admin ? 
          <AdminDashboard auth={this.props.auth} />
        :
          <StudentDashboard auth={this.props.auth} />
        }
      </>
    )
  }
}

class connectDashboard extends React.Component {
render(){
  return(
    <AuthConsumer>
      {auth => <Dashboard {...this.props} auth={auth}/>}
    </AuthConsumer>
    )
  }
}

export default connectDashboard