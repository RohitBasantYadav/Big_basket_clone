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
    SimpleGrid
  } from "@chakra-ui/react";

  import qualitySvg from "../assets/quality.svg";
import onTimeSvg from "../assets/onTime.svg";
import returnPolicySvg from "../assets/returnPolicy.svg";
import freeDeliverySvg from "../assets/freeDelivery.svg";
import playStoreSvg from "../assets/playStore.svg"
import iosSvg from "../assets/ios.svg"
import { useEffect } from "react";


const Test = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

useEffect(()=>{
    onOpen()
  },[])

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='30%'
      backdropBlur='3px'
    />

    <ModalContent bgColor="black" borderRadius="15px">
      <HStack >
        {/* Right-side content */}
        <VStack bgColor="#eeeeee" p="40px 0" borderRadius="15px 0 0 15px">
          <ModalHeader fontSize="14px">Why choose Bigbasket? </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} gap={8}>
              <Image src={qualitySvg} alt="quality-img"/>
              <Image src={onTimeSvg} alt="quality-img"/>
              <Image src={returnPolicySvg} alt="quality-img"/>
              <Image src={freeDeliverySvg} alt="quality-img"/>
            </SimpleGrid>
          </ModalBody>
          <Divider w="80%" borderColor="gray" borderWidth="1px"/>
          <ModalFooter>
            <HStack spacing={8}>
              <Text fontSize="12px">Find us on</Text>
              <Image src={playStoreSvg} alt="play store" />
              <Image src={iosSvg} alt="ios store" />
            </HStack>
          </ModalFooter>
        </VStack>

        {/* Left-side Content */}
        <VStack bgColor="black" color="white" border="1px solid blue" align="flex-start">
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </VStack>
      </HStack>
    </ModalContent>
  </Modal>
  )
}

export default Test
