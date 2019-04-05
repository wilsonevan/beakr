import React from 'react';
import { Link, } from 'react-router-dom';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Form, Grid, Container, Divider, Header, Button, Segment, } from 'semantic-ui-react';

// const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends React.Component {
  state = { editing: false, formValues: { first_name: '', last_name: '', email: '', biography: '', birth_date: '', }, };
  
  componentDidMount() {
    const { auth: { user: { first_name, last_name, email, biography, birth_date, }, }, } = this.props;
    this.setState({ formValues: { first_name, last_name, email, biography, birth_date, }, });
  }
  
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }
  
  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }
  
  profileView = () => {
    const { editing, } = this.state;

    const { auth: { user }, } = this.props;
    return (
      <>
        <Grid.Column width={4}>
          {/* <Image src={user.image || defaultImage} /> */}
        </Grid.Column>
        <Grid.Column width={8}>
        <Segment>
          <Header as="h1">{user.first_name} {user.last_name}</Header>
          <Header as="h2">{user.biography}</Header>
          <Header as="h2">{user.birth_date}</Header>

          <Header as="h1">{user.email}</Header>
        </Segment>
        <Button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>
        <Link to='/dashboard'>
          <Button>Back to Dashboard</Button>
        </Link>

        </Grid.Column>
      </>
    )
  }
  
  editView = () => {
    const { editing, } = this.state;

    const { formValues: { first_name, last_name, email, biography, birth_date, } } = this.state;
    return (
      <>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column width={8}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="First Name"
              name="first_name"
              value={first_name}
              required
              onChange={this.handleChange}
            />
            <Form.Input
              label="Last Name"
              name="last_name"
              value={last_name}
              required
              onChange={this.handleChange}
            />
            <Form.Input
              type='date'
              label="Birth Date"
              name="birth_date"
              value={birth_date}
              onChange={this.handleChange}
            />
            <Form.TextArea
              label="Biography"
              name="biography"
              value={biography}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Email"
              name="email"
              value={email}
              required
              onChange={this.handleChange}
            />
            <Button>Update</Button>
            <Button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</Button>

          </Form>
        </Grid.Column>
      </>
    )
  }
  
  render() {
    const { editing, } = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            { editing ? this.editView() : this.profileView()}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth => 
      <Profile { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile;