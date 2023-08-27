import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import NextChakraImg from "../misc/image.misc";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

interface GalleryCardProps {
    imgUrl: string;
    description?: string;
}
export default function GalleryCard({ imgUrl, description }: GalleryCardProps) {
    return (
        <VStack spacing={4} align="center">
            <NextChakraImg
                src={`${BACKEND_DOMAIN}${imgUrl}`}
                alt={description}
                height="466px"
                width={"700px"}
                objectFit={"contain"}
                borderRadius={"lg"}
                shadow={"xl"}
            />
            {description && (
                <Text
                    color={"text.secondary"}
                    fontSize={{ base: "md", md: "18px" }}
                    textAlign="center"
                >
                    {description}
                </Text>
            )}
        </VStack>
    );
}
