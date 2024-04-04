import { Box, Heading, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {

  return (
    <VStack spacing={4} align="stretch" bg="white" paddingBottom={0} paddingTop={0} paddingRight={0} paddingLeft={0} borderRadius="xl">
      <Image src={imageSrc} css={{
          width: "100%",
          objectFit: "cover",
          borderRadius: "10px"
        }}/>
      <VStack spacing={2} align="stretch" p={4} paddingBottom={0} paddingTop={0}>
        <Heading color='black' fontSize='lg'>{title}</Heading>
        <Text color='black'>{description}</Text>
      </VStack>
      <HStack spacing={2} p={4} paddingTop={0}>
        <Text color='black'>See more</Text>
        <FontAwesomeIcon icon={faArrowRight} size='1x' color='black'/>
      </HStack>
    </VStack>
  );
};

export default Card;
