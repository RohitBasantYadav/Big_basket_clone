import { Heading, Stack } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../Redux-Toolkit/features/authentication/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const [userDetail, setUserDetail] = useState({});
    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_API_URL;


    async function fetchProfile(token) {
        // Fetching userProfile 
        try {
            const userProfile = await axios.get(`${baseUrl}/user/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("userProfile", userProfile)
            setUserDetail(userProfile?.data)
        } catch (error) {
            if(error?.response?.status === 401){
                dispatch(logout());
                navigate("/login")
            }
        }

    }

    useEffect(() => {
        const { accessToken } = JSON.parse(localStorage.getItem("user"));
        // console.log(accessToken)
        fetchProfile(accessToken);
    }, [])
    return (
        <Stack spacing={5} w="40%" m="auto" border="3px solid green" p="20px" borderRadius="10px">
            <Heading textAlign="center" color="#cc0001" textDecoration="underline">Profile page</Heading>
            <Heading fontSize={30}>{`Hi,${userDetail?.name}`}</Heading>
            <Heading fontSize={20}>{`Email: ${userDetail?.email}`}</Heading>
        </Stack>
    )
}

export default Profile
