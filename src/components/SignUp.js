import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'
import axios from 'axios'
import TextInput from './common/TextInput'
import registerValidator from './validators/registerValidator'
const Body = styled.div`
width:100%;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
background-color:#3b4ad9;
`;
const Form = styled.div`
width:500px;
padding:20px;
background-color:#fb8809;
display:flex;
flex-direction:column;


.header{
    font-size:26px;
    font-weight:600;
    color:black;
    text-align:center;
}
.sub-header{
    font-size:18px;
    font-weight:400;
    color:black;
    text-align:center;
}
.footer{
    font-size:16px;
    font-weight:400;
    color:white;
    text-align:center;
}
.footer-error{
    font-size:16px;
    font-weight:400;
    color:white;
    text-align:center;
}
`;

const Button = styled.button`
padding:10px 16px;
font-size:20px;
font-weight:500;
background-color:#3b4ad9;
color:white;
margin:0 auto;
align-self: center;
border:0 ;
border-radius:5px;
:disabled{
    cursor:not-allowed;
    background-color:grey;
    color:black;
}
`;
if(localStorage.VadAuth){
    this.props.navigate("/welcome");
}

class SignUp extends Component {
    state= {
        name:"",
        email:"",
        password:"",
        password2:"",
        isLoading:false,
        errors:[],
        isValid:false
    }

    onChange =(e)=>{
        this.setState({[e.target.name] :e.target.value})
        const {errors, isValid} = registerValidator(this.state)
        console.log(errors)
        console.log(isValid)

        if(!isValid){
             console.log(isValid)
            this.setState({isValid:false})
            this.setState({errors:errors})
        }
        else{
            this.setState({isValid:true})
            this.setState({errors:{}})
            console.log(isValid)
        }


    }

    handleSubmit = async event => {
        event.preventDefault();
      
        // Promise is resolved and value is inside of the response const.
        if(this.state.username||this.state.email||this.state.password ===""){
            this.setState({error:"One of the field is missing"})
        }
        const response = await axios.get(`http://localhost:8000/`);
      
        console.log(response);
        console.log(response.data);
      };

    onSubmit = async e=>{
        this.setState({ isLoading: true });

       const data= {
            name:this.state.name,
            password:this.state.password,
            email:this.state.email
        }
    try {
     const result = await axios.post('http://localhost:8000/auth/register',data);
     if(result){
        localStorage.setItem({"VadAuth":"Loggedin"})
        this.props.navigate('/');
        //  this.setState({
        //    // hits: result.data.hits,
        //    isLoading: false
        //  });
     }
    } catch (error) {
        console.log(error.response.data.error)

      this.setState({
        errors:error.response.data.error,
        isLoading: false
      });
    }
  }


    render() {
        const {name,email,password,password2,errors,isValid,isLoading} = this.state
        return (
            <Body>
               <Form>
               <h3 className="header">SignUp</h3>
               <p className="sub-header">Kindly Sign Up to  Team Vad Account</p>
               <TextInput error={errors.name} name="name" placeholder="Enter your Fullname" value={name} onChange={this.onChange} type="text"/>
                <TextInput error={errors.email} name="email" placeholder="Enter your email" value={email} onChange={this.onChange} type="email"/>
                <TextInput error={errors.password} name="password" placeholder="Enter your password" value={password} onChange={this.onChange} type="password"/>
                {/* <TextInput error={errors.password2} name="password2" placeholder="Confirm your password" value={password2} onChange={this.onChange} type="password"/> */}
               
                <Button disabled={isValid ? null: true } onClick={this.onSubmit}>Sign-Up</Button>  
               <p className="footer">You Have an account <Link to="/">Sign In Here</Link> </p>
                {isLoading && <p className="footer">Loading... Loading... Loading</p>}
               </Form> 
            </Body>
        );
    }
}

export default SignUp;