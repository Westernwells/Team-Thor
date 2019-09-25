import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'
import axios from 'axios'
import TextInput from './common/TextInput'
import loginValidator from './validators/loginValidator'


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

class Login extends Component {

    state= {
        email:"",
        password:"",
        isLoading:false,
        errors:[],
        isValid:false
    }

    onChange =(e)=>{
        this.setState({[e.target.name] :e.target.value})
        const {errors, isValid} = loginValidator(this.state)
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

    onSubmit = async e=>{
        this.setState({ isLoading: true });
        if(this.state.email||this.state.password ===""){
            this.setState({error:"One of the field is missing"},{isLoading:false})
        }
        else{
            const data= {
                 email:this.state.email,
                 password:this.state.password
             }
         try {
          const result = await axios.post('http://localhost:8000/auth/login',data);
          if(result){
              localStorage.setItem({"VadAuth":"Loggedin"})
             this.props.navigate('/welcome',{data:result.data});
             //  this.setState({
             //    // hits: result.data.hits,
             //    isLoading: false
             //  });
          }
         } catch (error) {
             this.setState({
                 errors:error.response.data.error,
                 isLoading: false
               });
         }
        }
  }


    render() {
        const {email,password,isLoading,isValid,errors} = this.state
        return (
            <Body>
               <Form>
               <h3 className="header">Login</h3>
               <p className="sub-header">Kindly Sign In to Your Team Vad Account</p>
                <TextInput error={errors.email} name="email" placeholder="Enter your email" value={email} onChange={this.onChange} type="text"/>
                <TextInput error={errors.password} name="password" placeholder="Enter your password" value={password} onChange={this.onChange} type="password"/>
                <Button disabled={isValid ? null: true } onClick={this.onSubmit}>Login</Button>  
               <p className="footer">If you don't Have account <Link to="/signup">sign Up here</Link> </p>
               {isLoading && <p className="footer">Loading... Loading... Loading</p>}
               </Form> 
            </Body>
        );
    }
}

export default Login;