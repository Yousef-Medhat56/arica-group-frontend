import NextLink from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Image,
    Tag,
    Divider,
    HStack,
    GridItem,
    TagLeftIcon,
    TagLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import WithIconButton from "../buttons/with-icon.button";
import { ClockOutlinedIcon } from "../icons/clock.icon";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

export interface OfferCardProps {
    content: any;
    id:number;
    imgSrc: string;
    title: string;
    description: string;
    serviceName: string;
    serviceColor: string;
    discount: number;
    startDate: string;
    endDate: string;
    accessoryType?: { attributes: { name: string; color: string } };
    priceBefore?: number;
    isAccessoryCard?: boolean;
}

export default function OfferCard({
    content,
    id,
    imgSrc,
    title,
    description,
    discount,
    endDate,
    serviceName,
    serviceColor,
    accessoryType,
    priceBefore,
    isAccessoryCard,
}: OfferCardProps) {
    const router = useRouter();
    const isEnglish = router.locale === "en";

    return (
        <NextLink href={`/offer-request?offer=${id}`}>
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
                        justifyContent={"space-between"}
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
                                src={BACKEND_DOMAIN + imgSrc}
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

                        <Stack spacing={3} pos="relative">
                            <Tag
                                pos={"absolute"}
                                top={{ base: "-38px", lg: "-38px" }}
                                left={!isEnglish ? "0" : ""}
                                right={isEnglish ? "0" : ""}
                                size="md"
                                px="20px"
                                py="8px"
                                borderRadius={"lg"}
                                color={"#598321"}
                                bg={"#DFF0DF"}
                                variant="solid"
                                width={"fit-content"}
                                border={"1px solid #598321"}
                            >
                                <TagLeftIcon as={ClockOutlinedIcon} />
                                <TagLabel>
                                    {content.offersSection.available} {endDate}
                                </TagLabel>
                            </Tag>
                            <Tag
                                size="sm"
                                px="12px"
                                py="4px"
                                borderRadius={"lg"}
                                color={"white"}
                                bg={
                                    isAccessoryCard && accessoryType
                                        ? accessoryType.attributes.color
                                        : serviceColor
                                }
                                variant="solid"
                                width={"fit-content"}
                                fontWeight="light"
                            >
                                {isAccessoryCard && accessoryType
                                    ? accessoryType.attributes.name
                                    : serviceName}
                            </Tag>
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
                        <Stack spacing={3} mt={4}>
                            <Divider bg="#a9a9a9" h={"1px"} />
                            <HStack justifyContent={"space-between"}>
                                {accessoryType && priceBefore ? (
                                    <Text
                                        color={"text.secondary"}
                                        fontSize="sm"
                                    >
                                        <Text
                                            as="b"
                                            bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
                                            bgClip={"text"}
                                            fontSize="md"
                                        >
                                            {Math.floor(
                                                priceBefore -
                                                    priceBefore *
                                                        (discount / 100)
                                            )}{" "}
                                            {content.offersSection.pound}
                                        </Text>{" "}
                                        {content.offersSection.insteadOf}
                                        {"  "}
                                        <Text as="s" color={"red.500"}>
                                            {priceBefore}
                                        </Text>
                                    </Text>
                                ) : (
                                    <Text
                                        as="b"
                                        bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
                                        bgClip={"text"}
                                        fontSize="md"
                                    >
                                        {content.offersSection.discount}{" "}
                                        {discount}%
                                    </Text>
                                )}

                                <WithIconButton
                                    rightIcon={
                                        isEnglish ? (
                                            <ChevronRightIcon color="brand.linear.from" />
                                        ) : (
                                            <ChevronLeftIcon color="brand.linear.from" />
                                        )
                                    }
                                    text={content.offersSection.order}
                                />
                            </HStack>
                        </Stack>
                    </Box>
                </Center>
            </GridItem>
        </NextLink>
    );
}
