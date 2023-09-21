import React from "react";
import { VStack, Text, Heading } from "@chakra-ui/react";
import NextChakraImg from "../misc/image.misc";


interface WhyUsCardProps {
    iconUrl: string;
    title:string;
    description:string;
}
export default function WhyUsCard({
    iconUrl,
    title,
    description,
}: WhyUsCardProps) {
    return (
        <VStack spacing={4} align="center">
            <NextChakraImg
                src={iconUrl}
                alt={title}
                height="70px"
                width={"70px"}
                objectFit={"contain"}
            />
            <Heading as ="h3" fontSize={"xl"}>{title}</Heading>
            <Text
                color={"text.secondary"}
                fontSize={{ base: "md", md: "18px" }}
                textAlign="center"
            >
                {description}
            </Text>
        </VStack>
    );
}
