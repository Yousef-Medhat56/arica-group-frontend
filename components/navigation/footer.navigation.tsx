import {
    Box,
    chakra,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Select,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import NextLink from "next/link";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa";
import ImageComp from "../misc/image.misc";

//images
import MainContainer from "../containers/main.container";
import { useRouter } from "next/router";
import { get } from "../../adapters/index";
import { GetStaticProps } from "next";

export const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={"blackAlpha.100"}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{ svg: { fill: "brand.bg.green.light" } }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
            {children}
        </Text>
    );
};

export default function Footer({
    content,
    brand,
    socialMedia,
}: {
    content: any;
    brand: any;
    socialMedia: any;
}) {

    return (
        <>
            {socialMedia ? (
                <Box
                    bg={"#fafffb"}
                    color={"text.primary"}
                    mt={8}
                    borderTop={"2px solid #eee"}
                >
                    <MainContainer py={10}>
                        <SimpleGrid
                            templateColumns={{
                                sm: "1fr 1fr",
                                md: "2fr 1fr 1fr 1fr",
                            }}
                            spacing={8}
                        >
                            <Stack spacing={6}>
                                <Box>
                                    <NextLink href="/" passHref>
                                        <Link>
                                            <ImageComp
                                                src={
                                                    brand.attributes.logo.data
                                                        .attributes.url
                                                }
                                                alt={"Arica Group logo"}
                                                width={"160px"}
                                                height={"60px"}
                                                objectFit={"contain"}
                                            />
                                        </Link>
                                    </NextLink>
                                </Box>
                                <Text
                                    fontSize={{ sm: "sm", md: "md" }}
                                    color={"text.secondary"}
                                >
                                    {brand.attributes.gray_text}
                                </Text>
                                <Stack direction={"row"} spacing={6}>
                                    <SocialButton
                                        label={"Whatsapp"}
                                        href={socialMedia.whatsapp}
                                    >
                                        <FaWhatsapp />
                                    </SocialButton>
                                    <SocialButton
                                        label={"Facebook"}
                                        href={socialMedia.facebook}
                                    >
                                        <FaFacebook />
                                    </SocialButton>
                                    <SocialButton
                                        label={"Instagram"}
                                        href={socialMedia.instagram}
                                    >
                                        <FaInstagram />
                                    </SocialButton>
                                    <SocialButton
                                        label={"Twitter"}
                                        href={socialMedia.twitter}
                                    >
                                        <FaTwitter />
                                    </SocialButton>
                                    <SocialButton
                                        label={"Linkedin"}
                                        href={socialMedia.linkedin}
                                    >
                                        <FaLinkedin />
                                    </SocialButton>
                                </Stack>
                            </Stack>
                            <Stack align={"flex-start"}>
                                <ListHeader>
                                    {content.servicesSection.heading}
                                </ListHeader>
                                <NextLink href="/gardens" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.designGardens.name}
                                    </Link>
                                </NextLink>
                                <NextLink href="/maintenance-request" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.maintenanceWork.name}
                                    </Link>
                                </NextLink>
                                <NextLink href="/swimming-pools" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.swimmingPools.name}
                                    </Link>
                                </NextLink>
                                <NextLink href="/fountains" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.foundations.name}
                                    </Link>
                                </NextLink>
                            </Stack>
                            <Stack
                                align={"flex-start"}
                                marginTop={{ base: "-7", sm: "42px" }}
                            >
                                {/* <br/> */}
                                <NextLink href="/irrigation-networks" passHref>
                                    <Link color={"text.secondary"}>
                                        {
                                            content.services.irrigationNetworks
                                                .name
                                        }
                                    </Link>
                                </NextLink>
                                <NextLink href="/electricity-networks" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.electricyNetwork.name}
                                    </Link>
                                </NextLink>
                                <NextLink href="/accessories" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.gardenAcc.name}
                                    </Link>
                                </NextLink>
                                <NextLink href="/student-training" passHref>
                                    <Link color={"text.secondary"}>
                                        {content.services.studentTraining.name}
                                    </Link>
                                </NextLink>
                            </Stack>
                            <Stack
                                align={"flex-start"}
                                justify={"space-between"}
                                zIndex={0}
                            >
                                <ListHeader>
                                    <NextLink href="/offers" passHref>
                                        {content.header.offers}
                                    </NextLink>
                                </ListHeader>
                                <ListHeader>
                                    <NextLink href="/search" passHref>
                                        {content.header.search}
                                    </NextLink>
                                </ListHeader>
                                <ListHeader>
                                    <NextLink href="/contact" passHref>
                                        {content.header.contact}
                                    </NextLink>
                                </ListHeader>
                                <ListHeader>
                                    <NextLink href="/about-us" passHref>
                                        {content.header.about}
                                    </NextLink>
                                </ListHeader>
                                {/* <ListHeader>{content.lang.lang}</ListHeader>
                                <Select
                                    value={router.locale}
                                    placeholder={content.lang.lang}
                                    variant={"filled"}
                                    onChange={(e) => {
                                        window.location.assign(
                                            `/${e.target.value}`
                                        );
                                    }}
                                >
                                    <option value={"ar"}>
                                        {content.lang.ar}
                                    </option>
                                    <option value={"en"}>
                                        {content.lang.en}
                                    </option>
                                </Select> */}
                            </Stack>
                        </SimpleGrid>
                    </MainContainer>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
}


