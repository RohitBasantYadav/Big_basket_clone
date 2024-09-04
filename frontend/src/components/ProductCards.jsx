import { Box, Button, Card, CardBody, CardFooter, HStack, Image, Stack, Text,  } from "@chakra-ui/react"


const ProductCards = ({imageUrl,discountBadge,brandName,productName,size,price,strikedPrice}) => {
    return (
        <Box>
            <Card maxW="xs" boxShadow="xl" borderRadius="10px">
                <CardBody>
                    <Box border="1px solid" borderColor="gray.200" borderRadius="10px" p="25px" position="relative" >
                    <Image
                        src={imageUrl}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        w="100%"
                        objectFit="scale-down"
                    />
                    <Box border="1px solid green" borderRadius="10px 0 10px 0" w="35%" p="5px 2px" position="absolute" top="0" left="0" bgColor="#466f00" color="white">
                        <Text fontWeight="bold" fontSize="12px" textAlign="center">{`${discountBadge}% OFF`}</Text>
                    </Box>
                    </Box>
                    <Stack mt='6' spacing={1}>
                        <Text color="gray">{brandName}</Text>
                        <Text fontSize="18px" mb="40px" noOfLines={1}>{productName}</Text>
                        <Box border="1px solid" borderColor="gray.200" borderRadius="4px" px="10px" bgColor="#ece8e8" mb="5px">
                            <Text>{size}</Text>
                        </Box>

                        <HStack mb="20px">
                        <Text fontWeight="bold" fontSize='md'>
                            {`₹${price}`}
                        </Text>
                        <Text as="s" fontSize="sm" color="gray">{`₹${strikedPrice}`}</Text>
                        </HStack>

                    </Stack>
                </CardBody>

                <CardFooter>
                        <Button variant='outline' colorScheme='red' w="100%" _hover={{bgColor:"red", color:"white"}}>
                            Add
                        </Button>
                </CardFooter>
            </Card>
        </Box>
    )
}

export default ProductCards
