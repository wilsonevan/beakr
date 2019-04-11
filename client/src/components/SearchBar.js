import React, { Fragment } from "react";
import styled from "styled-components";
import axios from "axios";

/*//// DIRECTIONS //////

PROPS___________________
* The SearchBar takes: 
    'url' prop specifying the route url to post to
    'component' prop specifying which component to render in the search results
    'render' lets you specify a component to render where props (should) be passed
    'placeholder' prop specifies placeholder of searchbar
    'height' and 'width' lets you specify the dimension of the searchbar
        ^^ in order for overflow-y scroll to work, the height must be an absolut value (no percentages) 
        ^^ width is set to 100% and height is set to 30rem by default when no prop is passed
    (use only one of render or component)
    'updateFromParent' this prop can be set to any value, and when that value from the parent is toggled,
        the searchbar will resubmit its request and obtain new data. (Very useful when you need to
        force and update, albeit slightly questionable practice)

RESULT_PROP____________
* The component passed has a 'result' prop that is a reference to the items return from the query.
  Each result is one item.

UPDATE_SEARCH_PROP_____
* While the 'updateFromParent' prop is used to update the searchbar from the parent component, 
  the 'updateSearch' function is used to update the searchbar from the child component in the results list.
  Once a request has been made, call this.props.updateSearch from the component you passed into the
  render prop to update the searchbar. Make sure you call this function in THE CALLBACK OR .THEN METHOD of
  a promise, or else the query will likely finish before the prior request updates the database.

EXAMPLES________________
        // component to be rendered
        const TestLink = ({ result, someProp }) => (
            <Link onClick={() => someProp()} >{result.title}</Link>
        )

        // With component prop // 
        <SearchBar 
            route={`/api/contents/search`} 
            component={TestLink} 
            placeholder="Click Link"
            width="50%"
            height="1000px"
        />

        // with render prop // <--- to pass props
        <SearchBar
            route={`/api/contents/search/${this.props.something.id}`}
            render={props => (
                <TestLink {...props} someProp={this.someProp}/>
            )}
            placeholder="Click Link"
            width="100%"
            height="20rem"
        />

        // using updateSearch in render prop component//
          const TestLink = ({ result, deleteSomething, updateSearch }) => {
            const handleClick = () => {
              deleteSomething(result.id)
              .then(() => updateSearch()) <---- calling from callback is important
            }
            <Link onClick={() => handleClick()} >{result.title}</Link>
          }

////////////////////*/

class SearchBar extends React.Component {
  state = { input: "", results: [], update: false };

  timeout = null;

  componentDidMount() {
    axios
      .post(this.props.route, { input: this.state.input })
      .then(res => {
        this.setState({ results: res.data });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.route !== this.props.route) {
      axios.post(this.props.route, { input: this.state.input })
      .then(res =>  this.setState({ results: res.data }))
      .catch(err => console.log(err));

    } else if(prevState.update !== this.state.update) {
      axios.post(this.props.route, { input: this.state.input })
      .then(res =>  this.setState({ results: res.data }))
      .catch(err => console.log(err));

    } else if(prevProps.updateFromParent !== this.props.updateFromParent) {
      axios.post(this.props.route, { input: this.state.input })
      .then(res =>  this.setState({ results: res.data }))
      .catch(err => console.log(err));
    } 
  }

  updateSearch = () => {
    this.setState({ update: !this.state.update });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      axios
        .post(this.props.route, { input: this.state.input })
        .then(res => {
          this.setState({ results: res.data });
        })
        .catch(err => console.log(err));
    }, 400);
  };

  render() {
    return (
      <SearchContainer style={{ width: this.props.width ? this.props.width : "100%" }}>
        <SearchInput
          type="text"
          value={this.state.input}
          name="input"
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
        <SearchResults
          results={this.state.results}
          component={this.props.component}
          render={this.props.render}
          height={this.props.height}
          updateSearch={this.updateSearch}
        />
      </SearchContainer>
    );
  }
}

const SearchResults = ({ results, render, component, height, width, updateSearch }) => {
  const Component = component;

  if (render)
    return (
      <ResultsContainer
        style={{
          height: height ? height : "30rem",
        }}
      >
        {results.map(result => (
          <Fragment key={result.id}>{render({ result, updateSearch})}</Fragment>
        ))}
      </ResultsContainer>
    );
  else
    return (
      <ResultsContainer
        style={{
          height: height ? height : "30rem",
        }}
      >
        {results.map(result => (
          <Component key={result.id} result={result} updateSearch={this.updateSearch} />
        ))}
      </ResultsContainer>
    );
};

const SearchContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 0;
`;

const SearchInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  background-color: #f7f7f7;
  color: grey;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  font-size: 1.25rem;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  margin-top: 3rem;
  width: 100%;
  // padding-left: 1rem;
  overflow-y: auto;
  background-color: white;
`;

export default SearchBar;
