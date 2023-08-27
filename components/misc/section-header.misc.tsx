import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function SectionHeader({
    heading,
    description,
}: {
    heading: string;
    description: string;
}) {
    return (
        <VStack spacing={{ base: 3, md: 4 }} marginBottom={14}>
            <HStack spacing={3} dir="rtl">
                <Box
                    w={{ base: "40px", md: "48px" }}
                    h={{ base: "22px", md: "26px" }}
                    bgGradient="linear(to-r, brand.linear.from, brand.linear.to)"
                    borderTopLeftRadius={{ base: "30px", md: "35px" }}
                    borderBottomRightRadius={{ base: "30px", md: "35px" }}
                ></Box>
                <Heading
                    fontSize={{ base: "xl", md: "3xl" }}
                    color="text.primary"
                >
                    {heading}
                </Heading>
                <Box
                    w={{ base: "40px", md: "48px" }}
                    h={{ base: "22px", md: "26px" }}
                    borderTopRightRadius={{ base: "30px", md: "35px" }}
                    borderBottomLeftRadius={{ base: "30px", md: "35px" }}
                    bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
                ></Box>
            </HStack>
            <Text
                textAlign={"center"}
                color={"text.secondary"}
                fontSize={{ base: "md", md: "18px", xl: "22px" }}
            >
                {description}
            </Text>
        </VStack>
    );
}
