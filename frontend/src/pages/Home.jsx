import { Box, Heading, HStack, Image } from '@chakra-ui/react';
import HomeBanner from '../assets/HomeBanner.jpg'


const Home = () => {



  return (
    <Box w="80%" m="auto">
      <Box>
        <Image borderRadius="10px" src={HomeBanner} alt="Banner" />
      </Box>
      <HStack spacing={5} justify="center" mt="20px">
        <Image w="15%" src="https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_250923_01.png?tr=w-1920,q=80" />
        <Image w="15%" src="https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_250923_02.png?tr=w-1920,q=80" />
        <Image w="15%" src="https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_250923_03.png?tr=w-1920,q=80" />
        <Image w="15%" src="https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_250923_04.png?tr=w-1920,q=80" />
        <Image w="15%" src="https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_250923_05.png?tr=w-1920,q=80" />
        <Image w="15%" src="https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_250923_06.png?tr=w-1920,q=80" />
      </HStack>
      {/* <SimpleGrid h="100px" border="1px solid green"> 
        
       </SimpleGrid>
      <SimpleGrid h="100px" border="1px solid green"> 
        
       </SimpleGrid> */}
       <Box>
        <Heading my="20px" fontSize="25px">Top Offers</Heading>
       <HStack>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/2b94a9cf-895f-460d-849a-1eee860c974c/hp_dow-topoffersStorefront_m_480_250723_01.jpg?tr=w-1920,q=80"/>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/2b94a9cf-895f-460d-849a-1eee860c974c/hp_big-packs-topoffersStorefront_m_480_250723_02.jpg?tr=w-1920,q=80"/>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/2b94a9cf-895f-460d-849a-1eee860c974c/hp_combos-topoffersStorefront_m_480_250723_03.jpg?tr=w-1920,q=80"/>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/2b94a9cf-895f-460d-849a-1eee860c974c/hp_30-corner-topoffersStorefront_m_480_250723_04.jpg?tr=w-1920,q=80"/>
       </HStack>
       </Box>
       <Box>
        <Heading my="20px" fontSize="25px">Top Offers</Heading>
       <HStack>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/41a0810e-1fc3-46e4-9d2c-7d9e79e0aa29/hp_f&v_m_fresh-vegetables_480_250923.jpg?tr=w-1920,q=80"/>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/41a0810e-1fc3-46e4-9d2c-7d9e79e0aa29/hp_f&v_m_fresh-fruits_480_250923.jpg?tr=w-1920,q=80"/>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/41a0810e-1fc3-46e4-9d2c-7d9e79e0aa29/hp_f&v_m_cuts-&-exotics_480_250923.jpg?tr=w-1920,q=80"/>
        <Image w="25%" boxShadow="xl" borderRadius="10px" src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/41a0810e-1fc3-46e4-9d2c-7d9e79e0aa29/hp_f&v_m_herbs-&-seasoning_480_250923.jpg?tr=w-1920,q=80"/>
       </HStack>
       </Box>
    </Box>
  )
}

export default Home
