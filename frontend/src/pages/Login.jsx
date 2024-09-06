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
  InputRightElement,
  useToast
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

  // Chakra Ui Hooks
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // React Hooks
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  })

  // React- Redux Hook
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  // console.log(isLoggedIn)
  // console.log(error)


  useEffect(() => {
    onOpen();
    const userDetail = JSON.parse(localStorage.getItem("user"));
    // Checking if user is loggedIn or not from localstorage.
    if (userDetail?.isLoggedIn) {
      navigate("/")
    }

  }, [isLoggedIn])

  // Handling all the Input 
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetail({ ...userDetail, [name]: value })
  }

  // hadling after Login button is Clicked
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(userDetail)
    //dispatching user details
    //Dispatching fetchToken for Login Action
    const dispatchedAction = dispatch(fetchToken(userDetail));

    // Handling fetchToken for showing Toast 
    dispatchedAction.then((res) => {
      // console.log("LoginRes:", res?.payload?.msg)
      // console.log("LoginMsg", res?.error?.message)
      const statusCode = res?.error?.message;
      if (statusCode == "400" || statusCode == "404") {
        return toast({
          position: "top",
          title: `Invalid Credentials`,
          status: "error",
          duration: 4000,
          isClosable: true,
        })
      }
      if (res.payload.msg == 'Login Successful') {
        return toast({
          position: "top",
          title: `Login Successfull`,
          status: "success",
          duration: 4000,
          isClosable: true,
        })
      }

    })
    setUserDetail({
      email: "",
      password: ""
    });

  }
  // Toast Section 


  // Close Button of Modal
  const handleClose = () => {
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
              <ModalHeader textDecoration="underline" textDecorationColor="#cc0001">Login</ModalHeader>
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
                    mb={4}
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
                      mb={4}
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
                <Button onClick={() => navigate("/signup")} bgColor="green" color="white" border="none" mt={4} w="100%" colorScheme="none">Create New Account</Button>
              </ModalBody>
            </VStack>
          </HStack>
        </ModalContent>
      </Modal >
    </>
  )
}

export default Login
