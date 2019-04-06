import React from 'react';
import { Link, } from 'react-router-dom';
import { AuthConsumer, } from "../../providers/AuthProvider";
import { Form, Grid, Container, Divider, Header, Segment, Card, Image } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { ButtonGreen, ButtonGrey, } from '../../styles/Components'
import Moment from 'react-moment'

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends React.Component {
  state = { editing: false, formValues: { first_name: '', last_name: '', email: '', biography: '', birth_date: '', file: '', }, };
  
  componentDidMount() {
    const { auth: { user: { first_name, last_name, email, biography, birth_date,}, }, } = this.props;
    this.setState({ formValues: { first_name, last_name, email, biography, birth_date, file: '', }, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { first_name, last_name, email, biography, birth_date, file, }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { first_name, last_name, email, biography, birth_date, file, });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }
  
  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  onDrop = (files) => {
    this.setState({ formValues: { ...this.state.formValues, file: files[0], } });
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
        <Card>
          <Image src={user.image || defaultImage} />
        </Card>
        </Grid.Column>
        <Grid.Column width={12}>
        <Segment>
          <Header as="h1">{user.first_name} {user.last_name}</Header>
          <Header as='h3'>
            Biography:
          </Header>
          <div style={{marginLeft: '20px'}}>
            <Header as="h5">
                {user.biography}
            </Header>
          </div>
          <Header as='h3'>
            Birthday:
          </Header>
          <div style={{marginLeft: '20px'}}>
            <Header as="h5">
            <Moment format='MMM D, YYYY'date={user.birth_date} />
            </Header>
          </div>
          <Header as='h3'>
            Email:
          </Header>
          <div style={{marginLeft: '20px'}}>
            <Header as="h5">{user.email}</Header>
          </div>
        </Segment>
        <ButtonGrey style={{margin: '5px'}} onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</ButtonGrey>
        </Grid.Column>
      </>
    )
  }
  
  editView = () => {
    const { editing, } = this.state;
    const { auth: {user, }, } = this.props

    const { formValues: { first_name, last_name, email, biography, birth_date, } } = this.state;
    return (
      <>
        <Grid.Column width={4}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <Card
                {...getRootProps()}
                
              >
                <input {...getInputProps()} />
                { isDragActive ? <p>Drop files here...</p> 
                : <Image src={user.image || defaultImage} />

                }
              </Card>
            )
          }}
        </Dropzone>
        </Grid.Column>
        <Grid.Column width={12}>
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
            <ButtonGreen style={{margin: '5px'}}>Update</ButtonGreen>
            <ButtonGrey onClick={this.toggleEdit} style={{margin: '5px'}}>{editing ? 'Cancel' : 'Edit'}</ButtonGrey>

          </Form>
        </Grid.Column>
      </>
    )
  }
  
  render() {
    const { editing, } = this.state;
    return (
      <Container>
        <Link to='/dashboard'>
        <h1> {`<`} Dashboard </h1> 
        </Link>
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