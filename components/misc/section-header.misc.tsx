import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function SectionHeader({
    heading,
    description,
}: {
    heading: string;
    description?: string;
}) {
    return (
        <VStack spacing={{ base: 3, md: 4 }} marginBottom={{base:8,md:14}} position={"relative"} zIndex={1}>
            <HStack spacing={3} dir="rtl">
                <Box
                    w={{ base: "40px", md: "48px" }}
                    h={{ base: "22px", md: "26px" }}
                    bgGradient="linear(to-r, brand.linear.from, brand.linear.to)"
                    borderTopLeftRadius={{ base: "30px", md: "35px" }}
                    borderBottomRightRadius={{ base: "30px", md: "35px" }}
                ></Box>
                <Heading
                    fontSize={{ base: "xl", lg: "2xl" }}
                    color="text.primary"
                    textAlign={"center"}
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
            {description&&<Text
                textAlign={"center"}
                color={"text.secondary"}
                fontSize={{ base: "md", md: "18px", xl: "xl" }}
            >
                {description}
            </Text>}
        </VStack>
    );
}
