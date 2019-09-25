import React from 'react'
import styled from 'styled-components'

const TextRow = styled.div`
width:inherit;
display:flex;
flex-direction:column;
margin:10px 0;
.error{
    text-align:center;
    color:red;
    font-size:15px;
}
input{
    font-size:14px;
    padding:8px 10px;
    border-radius:5px;
}
`;

function TextInput({error,label,value,onChange,placeholder,name,type}) {
    return (
        <TextRow>
            <label htmlFor={label}>{label}</label>
            <input type={type} placeholder={placeholder} value={value} name={name} onChange={onChange}/>

            {error &&
                <p className="error">{error}</p> }
        </TextRow>
    )
}

export default TextInput;