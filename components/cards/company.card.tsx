import React from "react";
import { VStack, Text, Image } from "@chakra-ui/react";
import NextChakraImg from "../misc/image.misc";

interface CompanyCardProps {
    imgUrl: string;
    imgAlt: string;
    companyName: string;
}
export default function CompanyCard({
    imgUrl,
    imgAlt,
    companyName,
}: CompanyCardProps) {
    return (
        <VStack spacing={4} align="center">
            <Image
                src={imgUrl}
                alt={imgAlt}
                minH="65px"
                maxH={"70px"}
                // width={"160px"}
                objectFit={"contain"}
            />
            <Text
                color={"text.secondary"}
                fontSize={{ base: "md", md: "18px" }}
                textAlign="center"
            >
                {companyName}
            </Text>
        </VStack>
    );
}
