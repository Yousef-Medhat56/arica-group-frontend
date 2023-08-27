import { Box, Heading, VStack, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import NextChakraImg from "../misc/image.misc";
import ViewOnScroll from "../animation/view-on-scroll.animation";

interface ServiceCardProps {
    iconName: string;
    serviceName: string;
    serviceDesc: string;
}

export default function ServiceCard({
    iconName,
    serviceName,
    serviceDesc,
}: ServiceCardProps) {
    const [isSmallerThan426] = useMediaQuery("(max-width: 427px)");

    return (
        <>
            <ViewOnScroll>
                <VStack
                    spacing={{ base: 4, md: 5 }}
                    align={{ base: "center", md: "start" }}
                    paddingX={3}
                    paddingY={3}
                    borderRadius="lg"
                    transition={"0.3s ease"}
                    _hover={{ background: "#F6F6F6" }}
                >
                    <Box
                        padding={"6px 10px"}
                        bg="brand.bg.gray"
                        borderRadius={"lg"}
                    >
                        <NextChakraImg
                            src={`/icons/${iconName}`}
                            width="50px"
                            height="50px"
                        />
                    </Box>
                    <Heading as={"h3"} fontSize={{ base: "lg", md: "xl" }}>
                        {serviceName}
                    </Heading>
                    <Text
                        color="text.secondary"
                        fontSize={{ base: "md", md: "lg" }}
                        textAlign={{ base: "center", md: "start" }}
                    >
                        {serviceDesc}
                    </Text>
                </VStack>
            </ViewOnScroll>
        </>
    );
}
