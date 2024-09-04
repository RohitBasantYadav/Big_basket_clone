import {
  Image,
  Input,
  HStack,
  InputGroup,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  ModalOverlay,
  VStack,
  SimpleGrid,
  InputRightElement
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import qualitySvg from "../assets/quality.svg";
import onTimeSvg from "../assets/onTime.svg";
import returnPolicySvg from "../assets/returnPolicy.svg";
import freeDeliverySvg from "../assets/freeDelivery.svg";
import playStoreSvg from "../assets/playStore.svg"
import iosSvg from "../assets/ios.svg"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from '../Redux-Toolkit/features/authentication/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.isLoggedIn)
 
  

  useEffect(() => {
    onOpen();
    const userDetail = JSON.parse(localStorage.getItem("user"));
    // Checking if user is loggedIn or not from localstorage.
    if(userDetail?.isLoggedIn){
      navigate("/")
    }
  }, [state])

  // Handling all the Input 
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetail({ ...userDetail, [name]: value })
  }

  // hadling after Login button is Clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchToken(userDetail));
    // console.log(dispatch(fetchToken(userDetail)))
    setUserDetail({
      email: "",
      password: ""
    })
  }

  // Close Button of Modal
  const handleClose = ()=>{
    onClose();
    navigate("/")
  }
  return (
    <>
      {/* Login/SignUp Modal */}
      < Modal isCentered isOpen={isOpen} onClose={handleClose} size="xl" >
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='30%'
          backdropBlur='4px'
        />

        <ModalContent bgColor="black" borderRadius="15px">
          <HStack >
            {/* Right-side content */}
            <VStack bgColor="#eeeeee" p="40px 0" borderRadius="15px 0 0 15px">
              <ModalHeader fontSize="14px">Why choose Bigbasket? </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SimpleGrid columns={2} gap={8}>
                  <Image src={qualitySvg} alt="quality-img" />
                  <Image src={onTimeSvg} alt="quality-img" />
                  <Image src={returnPolicySvg} alt="quality-img" />
                  <Image src={freeDeliverySvg} alt="quality-img" />
                </SimpleGrid>
              </ModalBody>
              <Divider w="80%" borderColor="gray" borderWidth="1px" />
              <ModalFooter>
                <HStack spacing={8}>
                  <Text fontSize="12px">Find us on</Text>
                  <Image src={playStoreSvg} alt="play store" />
                  <Image src={iosSvg} alt="ios store" />
                </HStack>
              </ModalFooter>
            </VStack>

            {/* Left-side Content */}
            <VStack bgColor="black" color="white" align="flex-start">
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                {/* Login Input-form Section */}
                <form onSubmit={handleSubmit}>

                  {/* Email Input Field */}
                  <Input onChange={handleChange}
                    type='email'
                    name='email'
                    value={userDetail.email}
                    placeholder="Enter Email Id"
                    isRequired={true} bgColor="white"
                    color="black"
                    mb={10}
                    _focus={{ outlineColor: "green" }} />

                  {/* Password Input field */}
                  <InputGroup size='md'>
                    <Input
                      onChange={handleChange}
                      name='password'
                      value={userDetail.password}
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      isRequired={true}
                      mb={10}
                      bgColor="white"
                      color="black"
                      _focus={{ outlineColor: "green" }}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button bgColor="transparent" color="black" _hover={{ bgColor: "transparent" }} h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {/* On Submit Input Field */}
                  <Input cursor="pointer" type="submit" value="Login" bgColor="#cc0001" color="white" border="none" />
                </form>
              </ModalBody>
            </VStack>
          </HStack>
        </ModalContent>
      </Modal >
    </>
  )
}

export default Login
