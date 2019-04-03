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
<<<<<<< HEAD
        <Header as={Link} to='' onClick={() => this.props.history.goBack()} content='< Course Work' color='green' size='huge' textAlign='left'/>
=======
        <Header as={Link} to='/section/:section_id' content='< Course Work' color='green' size='huge' textAlign='left'/>
>>>>>>> 41523a8656f738a25bc9babb4a1347dfb83dc30c
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