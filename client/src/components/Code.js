import React from "react";
import styled from "styled-components";
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/python/python');

/* /// BASIC USAGE ///////////////

    VALUE_PROP____________________
    The 'value' prop is the value that the code editor will be set to.
    Use this for making the component controlled

    CODE_CHANGE_PROP______________
    The 'codeChange' prop is essentially the 'onChange' event handler, 
    but only the value can be passed into the function which handles the 
    change event. Pass a funtion into this prop that updates your state.
    ex) 
        handleCodeChange = (value) => {
            this.setState({ code: value });
        }
    HEIGHT_AND_WIDTH_PROPS________
    The 'height', and 'width' props let you specify the dimensions of your editor

    EXAMPLE_______________________

    state = {code: ""}

    handleCodeChange = (value) => {
        this.setState({ code: value });
    }

    <Code 
        value={this.state.code} 
        codeChange={this.handleCodeChange}
        height="100rem"
        width="50rem"
    />

*/////////////////////////////////


class Code extends React.Component {
    state = { language: this.props.language? this.props.language : "javascript" }

    componentDidMount() {
        const codeMirror = document.querySelector(".CodeMirror");
        codeMirror.style.height = `calc(${this.props.height} - 3.5rem)`;
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return(
            <>
                <CodeContainer style={{height: this.props.height, width: this.props.width}} >
                    <SelectLabel>
                        Syntax: 
                        <CodeSelect onChange={this.handleChange} value={this.state.language} name="language" >
                            <option value="javascript">Javascript</option>
                            <option value="ruby">Ruby</option>
                            <option value="python">Python</option>
                        </CodeSelect>
                    </SelectLabel>
                    <CodeMirror
                        value={this.props.value}
                        options={{
                            mode: this.state.language,
                            theme: 'material',
                            lineNumbers: true
                        }}
                        onBeforeChange={(editor, data, value) => {
                            if(this.props.codeChange) {
                                this.props.codeChange(value);
                            } else {
                            }
                        }}
                        autoScroll
                    />
                </CodeContainer>
            </>
        )
    }
}

const CodeContainer = styled.div`
    padding: 0.5rem;
    border-radius: 10px;
    background-color: #23a24d;
`

const CodeSelect = styled.select`
    background-color: #37474F;
    color: white;
    border: none;
    border-radius: 10px;
    margin-bottom: 0.5rem;
    margin-left: 0.75rem;
    height: 2rem;
`
const SelectLabel = styled.label`
    color: white;
    font-size: 1.15rem;
    height: 1rem;
    margin-left: 0.5rem;
`

export default Code;