import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const toast = useToast();
  // toast is a pop up

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "error",
        description: message,
        status: "error",
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  // this is how we will use toast in order for each product to pop up once clicking on the button to add product

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading>Create New Product</Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")}>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
