import NextLink from "next/link";

import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    GridItem,
} from "@chakra-ui/react";


export interface ProjectCardProps {
    content?: any;
    id: number;
    imgSrc: string;
    title: string;
    description: string;
}

export default function ProjectCard({
    content,
    id,
    imgSrc,
    title,
    description,
}: ProjectCardProps) {
    return (
        <NextLink href={`/projects/${id}`}>
            <GridItem w="100%">
                <Center h="100%">
                    <Box
                        w={"full"}
                        bg={"transparent"}
                        rounded={"md"}
                        p={4}
                        overflow={"hidden"}
                        border="1px"
                        borderColor={"#A9A9A9"}
                        cursor={"pointer"}
                        transitionDuration="0.4s"
                        role="group"
                        _hover={{ bg: "#F6F6F6" }}
                        h="100%"
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"start"}
                    >
                        <Box
                            bg={"transparent"}
                            mt={-6}
                            mx={-6}
                            mb={4}
                            overflow="hidden"
                            pos={"relative"}
                        >
                            <Image
                                src={imgSrc}
                                alt={title}
                                w="full"
                                fit={"cover"}
                                maxHeight="240px"
                                transition={"0.4s ease"}
                                _groupHover={{
                                    transform: "scale(1.2)",
                                }}
                            />
                        </Box>

                        <Stack spacing={3}>
                            <Heading color={"text.primary"} fontSize={"lg"}>
                                {title}
                            </Heading>
                            <Text
                                color={"text.secondary"}
                                lineHeight={"28px"}
                                fontSize={"sm"}
                            >
                                {description}
                            </Text>
                        </Stack>
                    </Box>
                </Center>
            </GridItem>
        </NextLink>
    );
}
