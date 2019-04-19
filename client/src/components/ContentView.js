import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditContentTitle from './EditContentTitle';
import EditContentBody from './EditContentBody';
import { Link } from 'react-router-dom';
import { Segment, Header, Icon, } from 'semantic-ui-react';
import { AuthConsumer, } from '../providers/AuthProvider';

class ContentView extends React.Component {
  state = { title: '', body: '', id: '', editingTitle: false, editingBody: false }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/contents/${id}`)
      .then( res => {
        this.setState({ title: res.data.title, body: res.data.body, id: res.data.id })
      })
  };

  createMarkup = (html) => {
    return { __html: html };
  };

  updateContentBody = contentBody => {
    const { id } = this.props.match.params;
    axios
      .put(`/api/contents/${id}`, contentBody)
      .then(res => {
        this.setState({ body: res.data.body, editingBody: false });
      })
      .catch(err => console.log(err));
  };

  updateContentTitle = contentTitle => {
    const { id } = this.props.match.params;
    axios
      .put(`/api/contents/${id}`, contentTitle)
      .then(res => {
        this.setState({ title: res.data.title, editingTitle: false });
      })
      .catch(err => console.log(err));
  };

  deleteContent = id => {
    axios
      .delete(`/api/contents/${id}`)
      .then(res => {
        this.props.history.goBack();
      })
      .catch(err => console.log(err));
  };

  toggleEditingBody = () => {
    this.setState({ editingBody: !this.state.editingBody });
  }

  toggleEditingTitle = () => {
    this.setState({ editingTitle: !this.state.editingTitle });
  };

  render() {
    const { title, body, id, editingTitle, editingBody } = this.state
    const { auth: {user, }, } = this.props

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {!editingTitle && title}
        </Header>
        { user.admin ?
          <> 
            {!editingTitle ? (
              <>
                <BlueLink onClick={() => this.toggleEditingTitle()}>
                  Edit Name
                </BlueLink>
                <span style={{ color: "#0029ff", fontSize: "0.7rem" }}>
                  &nbsp;or&nbsp;
                </span>
                <BlueLink onClick={() => this.deleteContent(id)}>
                  Delete
                </BlueLink>
              </>
            ) : (
              <EditContentTitle
                title={title}
                updateContentTitle={this.updateContentTitle}
              />
            )}
          </>
        :
          <>
          </> 
        }
        <Segment>
          {editingBody ? (
            <EditContentBody
              body={body}
              updateContentBody={this.updateContentBody}
            />
          ) : (    
            <div 
              dangerouslySetInnerHTML=
              {this.createMarkup(body)}
              style={{padding: '15px'}}
            />
          )}
          { user.admin ?
            <div>    
              {editingBody? 
                <BlueLink onClick={() => this.toggleEditingBody()}>
                  Cancel Edit 
                </BlueLink>
              : 
                <BlueLink onClick={() => this.toggleEditingBody()}>
                  Edit Content
                </BlueLink>
              }
            </div>
          :
            <>
            </>
          }
        </Segment>
      </>
    )
  }
}

class connectContentView extends React.Component {
  render(){
    return(
      <AuthConsumer>
        {auth => <ContentView {...this.props} auth={auth}/>}
      </AuthConsumer>
    )
  }
}

const BlueLink = styled.button`
  display: inline-block;
  text-decoration: none;
  background-color: transparent;
  border: none;
  color: #2979ff;
  font-family: "Poppins";
  font-size: 0.7rem;
  letter-spacing: 1px;
  cursor: pointer;

  :hover {
    color: grey;
  }

  :active {
    color: darkgrey;
  }
`;

export default connectContentView