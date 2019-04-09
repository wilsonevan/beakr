import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Segment, Header, Icon, } from 'semantic-ui-react';

class ContentView extends React.Component {
  state = { title: '', body: '' }

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/contents/${id}`)
      .then( res => {
        this.setState( res.data )
      })
  }

  createMarkup = (html) => {
    return { __html: html };
  };

  render() {
    const { title, body, } = this.state

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {title}
        </Header>
        <Segment>
          <div 
            dangerouslySetInnerHTML=
            {this.createMarkup(body)}
            style={{padding: '15px'}}
          />
        </Segment>
      </>
    )
  }
}

export default ContentView