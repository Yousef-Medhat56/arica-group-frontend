import React from "react";
import { VStack, Text, Image } from "@chakra-ui/react";

interface GalleryCardProps {
    imgUrl: string;
    description?: string;
}
export default function GalleryCard({ imgUrl, description }: GalleryCardProps) {
    return (
        <VStack spacing={4} align="center">
            <Image
                src={imgUrl}
                alt={description}
                height={[210, 300, 466]}
                width={[320, 500, 700]}
                objectFit={"contain"}
                borderRadius={"lg"}
                shadow={"sm"}
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
