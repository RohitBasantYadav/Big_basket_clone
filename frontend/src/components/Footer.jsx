import { Box, HStack, ListItem, Stack, UnorderedList, Image } from '@chakra-ui/react';
import footerLogo from "../assets/footerLogo.svg"
import playStore from "../assets/playStore.svg"
import iosStore from "../assets/ios.svg"
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <Stack color="white" bgColor="black" lineHeight={2} fontSize="14px" mt="60px">
      <HStack w="80%" m="auto" mt="60px" mb="20px" justify="space-between">
        <Box>
          <UnorderedList styleType="none">
            <ListItem fontWeight="500">Bigbasket</ListItem>
            <ListItem>About Us</ListItem>
            <ListItem>Become A bigbasket Rider</ListItem>
            <ListItem>In News</ListItem>
            <ListItem>Green bigbasket</ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem>Terms and Conditions</ListItem>
            <ListItem>Careers At bigbasket</ListItem>
            <ListItem>bb Instant</ListItem>
            <ListItem>bb Daily</ListItem>
            <ListItem>bb Blog</ListItem>
            <ListItem>bbnow</ListItem>
          </UnorderedList>
        </Box>
        <Box >
          <UnorderedList styleType="none">
            <ListItem fontWeight="500">Help</ListItem>
            <ListItem>FAQs</ListItem>
            <ListItem>Contact Us</ListItem>
            <ListItem>bb Wallet FAQs</ListItem>
            <ListItem>bb Wallet T&Cs</ListItem>
            <ListItem>Vendor Connect</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Box>
            <Image src={footerLogo} alt="footer-logo" />
          </Box>
          <HStack justify="space-evenly" mt="20px" spacing={10}>
            <Image src={playStore} alt="footer-logo" />
            <Image filter="invert(100%)" src={iosStore} alt="footer-logo" />
          </HStack>
          <HStack justify="space-evenly" mt="20px" fontSize="20px">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaPinterestP />
          </HStack>
        </Box>
      </HStack>
    </Stack>
  )
}

export default Footer
