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

RESULT_PROP_______
* The component passed has a 'result' prop that is a reference to the items return from the query.
  Each result is one item.

STYLING_________________
* wrap the component in a container, and style the height and width of the container

    Example) 
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


////////////////////*/

class SearchBar extends React.Component {
  state = { input: "", results: [] };

  timeout = null;

  componentDidMount() {
    axios
      .post(this.props.route, { input: this.state.input })
      .then(res => {
        this.setState({ results: res.data });
      })
      .catch(err => console.log(err));
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
      <SearchContainer>
        <SearchInput
          type="text"
          value={this.state.input}
          name="input"
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          style={{ width: this.props.width ? this.props.width : "100%" }}
        />
        <SearchResults
          results={this.state.results}
          component={this.props.component}
          render={this.props.render}
          height={this.props.height}
          width={this.props.width}
        />
      </SearchContainer>
    );
  }
}

const SearchResults = ({ results, render, component, height, width }) => {
  const Component = component;

  if (render)
    return (
      <ResultsContainer
        style={{
          height: height ? height : "30rem",
          width: width ? width : "100%"
        }}
      >
        {results.map(result => (
          <Fragment key={result.id}>{render({ result })}</Fragment>
        ))}
      </ResultsContainer>
    );
  else
    return (
      <ResultsContainer
        style={{
          height: height ? height : "30rem",
          width: width ? width : "100%"
        }}
      >
        {results.map(result => (
          <Component key={result.id} result={result} />
        ))}
      </ResultsContainer>
    );
};

const SearchContainer = styled.div`
  position: relative;
  margin-top: 0;
`;

const SearchInput = styled.input`
  position: absolute;
  top: -3rem;
  left: 0;
  margin-top: 0;
  height: 3rem;
  padding-left: 1rem;
  background-color: #f7f7f7;
  color: grey;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  z-index: 10;
  font-size: 1.25rem;
`;

const ResultsContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  overflow-y: scroll;
  background-color: white;
`;

export default SearchBar;
