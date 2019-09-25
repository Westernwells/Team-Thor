import React, { Component } from 'react';
import styled from 'styled-components'
const Body = styled.div`
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
background-color:#3b4ad9;

h1{
    color: #fb8809;
    font-size:30px;
    font-weight:600
}

`;

class Welcome extends Component {
    render() {
        return (
            <Body>
              <h1>Welcome to Team Vad</h1>  
            </Body>
        );
    }
}

export default Welcome;