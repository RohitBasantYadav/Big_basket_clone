import {
  Link as ChakraLink,
  Stack,
  Image,
  Box,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Text
} from "@chakra-ui/react";
import { ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { FaBagShopping, FaCaretDown, FaCompass } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { useNavigate, NavLink as ReactRouteLink } from 'react-router-dom';
import './componentsStyleSheet/Navbar.css';
import logo from "../assets/big_basket_logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux-Toolkit/features/authentication/authSlice";
import axios from "axios";


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search,setSearch] = useState("")
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.isLoggedIn)
  const {cartItem} = useSelector((state) => state.cart)
  // console.log(state);

  useEffect(() => {
    const userDetail = JSON.parse(localStorage.getItem("user"));
    // Checking if user is loggedIn or not from localstroage.
    setIsLoggedIn(userDetail?.isLoggedIn);
  }, [state, isLoggedIn])

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  }

  const handleSearch = async(e)=>{
    const {accessToken} = JSON.parse(localStorage.getItem("user"))
    const baseUrl = import.meta.env.VITE_API_URL
    const res = await axios.get(`${baseUrl}/products/allProducts?q=${e.target.value}`,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    })
    console.log(res)
  }


  const navlinks = [
    // { link: "/", label: "Home" },
    { link: "/fruits&vegetables", label: "Fruits & Vegetables" },
    { link: "/tea", label: "Tea" },
    { link: "/ghee", label: "Ghee" },
    { link: "/honey", label: "Honey" },
    { link: "/milk", label: "Milk" },
    // { link: "/login", label: "Login/Sign-up" }
  ];

  const menuItemsInNavlinks = [
    { link: "/chocolates", label: "Chocolates" },
    { link: "/cup_noodles", label: "Cup Noodles" },
    { link: "/yogurt_shrikhand", label: "Yogurt & Shrikhand" },
    { link: "/eggs", label: "Eggs" },
    { link: "/fresh_chicken", label: "Fresh Chicken" },
    { link: "/haircare", label: "Hair Care" },
  ];

  const menuItemsInCategory = [
    { link: "/apparels", label: "Apparel" },
    { link: "/fruits&vegetables", label: "Fruits & Vegetables" },
    { link: "/ghee", label: "Foodgrain, Oil & Masala" },
    { link: "/tea", label: "Beverages" },
    { link: "/honey", label: "Snacks & Branded Foods" },
    { link: "/milk", label: "Dairy Products" },
    { link: "/eggs_meat_fish", label: "Eggs, Meat & Fish" },
    { link: "/baby_care", label: "Baby Care" },
    { link: "/lunch_boxes_bags", label: "Lunch Boxes & Bags" },
  ];

  return (
    <Stack mb={8} boxShadow="md" pb={4} position="sticky" top="0" zIndex={50} bgColor="white">
      {/* Upper Navbar section*/}

      <HStack spacing={4} justify="center" align="center">

        {/* Logo */}
        <Box>
          <Image onClick={() => navigate("/")} cursor="pointer" boxSize={65} w="100%" src={logo} alt="logo" />
        </Box>

        {/* Search Box */}
        <Box w="40%">
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='green.400' />
            </InputLeftElement>
            <Input onChange={handleSearch} type='search' focusBorderColor="green.300" placeholder='Search for Products...' />
          </InputGroup>
        </Box>

        {/* Location Button */}
        <Button leftIcon={<FaCompass />} fontSize={12} colorScheme='gray' variant='solid'>
          Select Location
        </Button>

        {/* SignUp/Login button */}
        {
          isLoggedIn ?
            // Profile Section
            // <Button onClick={()=>navigate("/profile")} color="black" fontSize={30} bgColor="gray.100">{<IoMdContact />}</Button>
            <Menu>
              <MenuButton as={IconButton} icon={<IoMdContact />} color="black" fontSize={30} bgColor="gray.100" />
              <MenuList>
                <MenuItem as={ReactRouteLink} to="/profile" >Profile</MenuItem>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
              </MenuList>

            </Menu>
            :
            <Button onClick={() => navigate("/login")} color="white" fontSize={12} bgColor="black" _hover={{ color: "white", bgColor: "black" }}>Login/ Sign Up</Button>
        }


        {/* CART Button */}
        <HStack position="relative" spacing={0}>
        <IconButton  onClick={()=>navigate("/cart")} colorScheme="red" icon={<FaBagShopping />} />
        {
          cartItem.length>0?
          <Text position="absolute" bottom={0} right={0} borderRadius="5px" p="0px 6px" bgColor="black" color="white">{cartItem.length}</Text>
          :
          null
        }
        </HStack>
      </HStack>


      {/* Lower Navbar section */}
      <HStack spacing={4} justify="center" align="center">

        {/* Menu Item Lists in category */}
        <Menu>
          <MenuButton as={Button} rightIcon={<FaCaretDown />} colorScheme="none" bgColor="#5e9400" color="white" _focus={{ bgColor: "#5e9400", color: "white" }} _hover={{ bgColor: "#5e9400", color: "white" }}>
            Shop by Category
          </MenuButton>
          <MenuList>
            {menuItemsInCategory.map((item) => <MenuItem as={ReactRouteLink} to={item.link} key={item.label} >
              {item.label}
            </MenuItem>
            )}
          </MenuList>
        </Menu>

        {/* Navlinks */}
        <HStack fontSize="16px" spacing={6} id="nav">
          {
            navlinks.map((links) => <ChakraLink as={ReactRouteLink} key={links.link} to={links.link} px="20px" py="4px">{links.label}</ChakraLink>)
          }
        </HStack>

        {/* Menu Items in navlinks(Inside >>)*/}
        <Menu>
          <MenuButton as={IconButton} icon={<ArrowRightIcon />} fontSize="12px" variant="ghost" colorScheme="none" _hover={{ color: "red" }} />
          <MenuList>
            {menuItemsInNavlinks.map((item) => <MenuItem as={ReactRouteLink} to={item.link} key={item.label} >
              {item.label}
            </MenuItem>
            )}
          </MenuList>

        </Menu>
        <Divider borderColor="gray" orientation='vertical' height="20px" />

        <Image cursor="pointer" src="https://www.bigbasket.com/media/uploads/banner_images/Smart_basket-250124-1.png" alt="smart-basket" />
        <Image cursor="pointer" src="https://www.bigbasket.com/media/uploads/banner_images/hp_cmc_m_offer_28_220921_all.png" alt="offer" />
      </HStack>
    </Stack>
  )
}

export default Navbar
