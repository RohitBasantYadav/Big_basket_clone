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
  Divider
} from "@chakra-ui/react";
import { ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { FaBagShopping, FaCaretDown, FaCompass } from "react-icons/fa6";
import { NavLink as ReactRouteLink } from 'react-router-dom';
import './componentsStyleSheet/Navbar.css';
import logo from "../assets/big_basket_logo.png";

const Navbar = () => {
  const navlinks = [
    // { link: "/", label: "Home" },
    { link: "/fruits&vegetables", label: "Fruits & Vegetables" },
    { link: "/tea", label: "Tea" },
    { link: "/ghee", label: "Ghee" },
    { link: "/nandini", label: "Nandini" },
    { link: "/milk", label: "Milk" },
    // { link: "/login", label: "Login/Sign-up" }
  ];

  const menuItemsInNavlinks = [
    {link:"/chocolates",label:"Chocolates"},
    {link:"/cup_noodles",label:"Cup Noodles"},
    {link:"/yogurt_shrikhand",label:"Yogurt & Shrikhand"},
    {link:"/eggs",label:"Eggs"},
    {link:"/honey",label:"Honey"},
    {link:"/fresh_chicken",label:"Fresh Chicken"},
    {link:"/haircare",label:"Hair Care"},
  ];

  const menuItemsInCategory = [
    {link:"/apparels", label:"Apparel"},
    {link:"/fruits&vegetables", label:"Fruits & Vegetables"},
    {link:"/foodgrains_oil_masala", label:"Foodgrain, Oil & Masala"},
    {link:"/beverages", label:"Beverages"},
    {link:"/snacks_branded_foods", label:"Snacks & Branded Foods"},
    {link:"/beauty_hygine", label:"Beauty & Hygine"},
    {link:"/eggs_meat_fish", label:"Eggs, Meat & Fish"},
    {link:"/baby_care", label:"Baby Care"},
    {link:"/lunch_boxes_bags", label:"Lunch Boxes & Bags"},
  ];

  return (
    <Stack mb={8} boxShadow="md" pb={4}>
      {/* Upper Navbar section*/}
      <HStack spacing={4} justify="center" align="center">
        <Box>
          <Image boxSize={65} w="100%" src={logo} alt="logo" />
        </Box>
        <Box w="40%">
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='green.400' />
            </InputLeftElement>
            <Input type='search' focusBorderColor="green.300" placeholder='Search for Products...' />
          </InputGroup>
        </Box>
        <Button leftIcon={<FaCompass />} fontSize={12} colorScheme='gray' variant='solid'>
          Select Location
        </Button>
        {/* SignUp */}
        <Button color="white" fontSize={12} bgColor="black" _hover={{color:"white", bgColor:"black"}}>Login/ Sign Up</Button>

        {/* CART Button */}
        <IconButton colorScheme="red" icon={<FaBagShopping />} />
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

        {/* Menu Icon Items in navlinks*/}
        <Menu>
          <MenuButton as={IconButton} icon={<ArrowRightIcon/>} fontSize="12px" variant="ghost" colorScheme="none" _hover={{color:"red"}}/>
          <MenuList>
          {menuItemsInNavlinks.map((item) => <MenuItem as={ReactRouteLink} to={item.link} key={item.label} >
                {item.label}
            </MenuItem>
          )}
          </MenuList>
          
        </Menu>
        <Divider borderColor="gray" orientation='vertical' height="20px"/>

        <Image cursor="pointer" src="https://www.bigbasket.com/media/uploads/banner_images/Smart_basket-250124-1.png" alt="smart-basket" />
        <Image cursor="pointer" src="https://www.bigbasket.com/media/uploads/banner_images/hp_cmc_m_offer_28_220921_all.png" alt="offer" />
      </HStack>
    </Stack>
  )
}

export default Navbar
