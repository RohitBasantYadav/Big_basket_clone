import { Heading, Stack } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'

const Profile = () => {
    const [userDetail,setUserDetail] = useState({});

    const baseUrl = import.meta.env.VITE_API_URL;

    async function fetchProfile(token){
        // Fetching userProfile 
        const userProfile = await axios(`${baseUrl}/user/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setUserDetail(userProfile?.data)
    }

    useEffect(()=>{
        const {accessToken} = JSON.parse(localStorage.getItem("user"));
        // console.log(accessToken)
        fetchProfile(accessToken);
    },[])
  return (
    <Stack spacing={5} w="40%" m="auto" border="3px solid green" p="20px" borderRadius="10px">
        <Heading textAlign="center" color="#cc0001" textDecoration="underline">Profile page</Heading>
        <Heading fontSize={30}>{`Hi,${userDetail?.name}`}</Heading>
        <Heading fontSize={20}>{`Email: ${userDetail?.email}`}</Heading>
    </Stack>
  )
}

export default Profile
