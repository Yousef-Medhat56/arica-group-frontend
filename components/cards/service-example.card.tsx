import {
    Heading,
    HStack,
    VStack,
    Text,
    Box,
    Center,
    Stack,
} from "@chakra-ui/react";
import SingleItemSlider from "../slider/single-item.slider";
import GalleryCard from "./gallery.card";

interface ServiceExampleCardProps {
    title: string;
    description: string;
    imgArr: any[];
    index: number;
}
export default function ServiceExampleCard({
    title,
    description,
    imgArr,
    index,
}: ServiceExampleCardProps) {
    return (
        <Stack
            marginTop={{base:16}}
            spacing={{base:8,lg:6}}
            justifyContent="space-between"
            direction={{ base: "column", lg: "row" }}
            alignItems="center"
        >
            <VStack
                maxW={{ base: "100%", lg: "45%" }}
                alignItems="start"
                spacing={6}
                order={{ base: 0, lg: index % 2 == 0 ? 0 : 1 }}
            >
                <Heading as={"h2"} fontSize="xl">
                    {title}
                </Heading>
                <Text
                    color={"text.secondary"}
                    fontSize={{
                        base: "md",
                    }}
                    lineHeight="1.7"
                >
                    {description}
                </Text>
            </VStack>
            
            <Box maxW={{base:"350px",md:"80%",lg:"50%"}}>
                <SingleItemSlider autoplaySpeed={2000 + 500 * index}>
                    {imgArr.map((image, index) => {
                        return (
                            <Center key={index}>
                                <GalleryCard imgUrl={image.attributes.url} />
                            </Center>
                        );
                    })}
                </SingleItemSlider>
            </Box>
        </Stack>
    );
}
