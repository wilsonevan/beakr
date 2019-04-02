import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Segment, Header, Icon, } from 'semantic-ui-react';

class LectureView extends React.Component {
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
        <Header as={Link} to='/section/:section_id' content='< Course Work' color='green' size='huge' textAlign='left'/>
        <BasicHeader style={{ color: '#23A24D' }}>
          <Icon name='block layout' color='green' />
            {title}
        </BasicHeader>
        <SegmentContent>
          {content}
        </SegmentContent>
      </>
    )
  }
}

const BasicHeader = styled.h3`
  font-family: 'Courier New', Courier, serif
`

const SegmentContent = styled(Segment)`
  font-family: 'Courier New', Courier, serif
`

export default LectureView