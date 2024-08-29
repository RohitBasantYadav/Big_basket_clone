import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { fetchToken } from '../Redux-Toolkit/features/authentication/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email:"",
        password:"",
    })
    const dispatch = useDispatch();
    // const state = useSelector((state)=>state)
    // console.log(state)
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInput({...input,[name]:value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(fetchToken(input));
        setInput({
            email:"",
            password:""
        })
    }
  return (
    <Box>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type='email' name='email' value={input.email} placeholder='Enter your email' required={true}/>
            <input onChange={handleChange} type='password' name='password' value={input.password} placeholder='Enter your password' required={true}/>
            <input type="submit" value="Login"/>
        </form>
    </Box>
  )
}

export default Login
