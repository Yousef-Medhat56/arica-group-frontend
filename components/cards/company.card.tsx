import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import NextChakraImg from "../misc/image.misc";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
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
            <NextChakraImg
                src={`${BACKEND_DOMAIN}${imgUrl}`}
                alt={imgAlt}
                height="60px"
                width={"160px"}
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
