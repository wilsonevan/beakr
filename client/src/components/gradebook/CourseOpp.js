// import React from 'react'
// import {DropdownMenu,} from 'semantic-ui-react'
// import axios from 'axios'



// class CourseOpp extends React.Component{
// state = {course: []};


// componentDidMount() {
//   debugger
//     axios.get(`/api/user/${this.props.id}/course/${this.props.id}`)
//       .then( res => {
//         this.setState({ course: res.data, });
//       })
//   }

//   courseChoice = ()=> {
//       const { course, } = this.state;
//       return course.map( course => (
        
//         <DropdownMenu as="h4">{course.title}</DropdownMenu>
//       ))
//     }
  
    
//     render(){

    
//     return(
//       <>  
//         <DropdownMenu
//           placeholder='Course'
//           fluid
//           selection
//           options={this.state.course && this.courseChoice}
//         />
//       </>
//     )
//   }
// }
// options={this.state.course && this.courseChoice}
 
  
  

// export default CourseOpp



// constructor(props){
//   super(props)
//   this.state = {
//     listOpen: false,
//     headerTitle: this.props.title
//   }
// }



// handleClickOutside(){
//   this.setState({
//     listOpen: false
//   })
// }
// toggleList(){
//   this.setState(prevState => ({
//     listOpen: !prevState.listOpen
//   }))
// }
// render(){
//   const{list} = this.props
//   const{listOpen, headerTitle} = this.state
//   return(
//    <div class="ui compact menu">
//   <div class="ui simple dropdown item">
//     Dropdown <i class="dropdown icon"></i>
//     <div class="menu">
//       <div class="item">Choice 1</div>
//       <div class="item">Choice 2</div>
//       <div class="item">Choice 3</div>
//     </div>
//   </div>
// </div>/div>
//   )
// }




// toggleSelected(id, key){
//   let temp = this.state[key]
//   temp[id].selected = !temp[id].selected
//   this.setState({
//     [key]: temp
//   })
// }