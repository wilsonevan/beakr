import React from 'react'
import {Dropdown,} from 'semantic-ui-react'
import axios from 'axios'



class CourseOpp extends React.Component{
state = {course: []};


componentDidMount() {
  debugger
    axios.get(`/api/user/${this.props.id}/course/${this.props.id}`)
      .then( res => {
        this.setState({ course: res.data, });
      })
  }

  courseChoice = ()=> {
      const { course, } = this.state;
      return course.map( course => (
        
        <Dropdown as="h4">{course.title}</Dropdown>
      ))
    }
    
    toggleSelected(id, key){
      let temp = this.state[key]
      temp[id].selected = !temp[id].selected
      this.setState({
        [key]: temp
      })
    }
  
    
    render(){

    
    return(
      <>  
        <Dropdown
          placeholder='Course'
     
          selection
          options={this.state.course && this.courseChoice}
        />
      </>
    )
  }
}
 
export default CourseOpp