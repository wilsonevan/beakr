import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Segment, Header, Icon, } from 'semantic-ui-react';

class ContentView extends React.Component {
  state = { title: '', content: '' }

  componentDidMount() {
    const { unit_id, id } = this.props.match.params
    axios.get(`/api/units/${unit_id}/contents/${id}`)
      .then( res => {
        this.setState( res.data )
      })
  }

  render() {
    const { title, content, } = this.state

    return (
      <>
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
        <Header style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {title}
        </Header>
        <Segment>
          {content}
        </Segment>
      </>
    )
  }
}

export default ContentView