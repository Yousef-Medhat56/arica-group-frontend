import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,

    useColorModeValue,
    Select,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import NextLink from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import ImageComp from "../misc/image.misc";

//images
import Logo from "../../public/images/logo.png";
import MainContainer from "../containers/main.container";
import { useRouter } from "next/router";

const SocialButton = ({
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
            _hover={{"svg":{fill:"brand.bg.green.light"}}}
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

export default function Footer({ content }: { content: any }) {
    const router = useRouter();

    return (
        <Box bg={"#fafffb"} color={"text.primary"} mt={8} borderTop={"2px solid #eee"}>
            <MainContainer py={10}>
                <SimpleGrid
                    templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }}
                    spacing={8}
                >
                    <Stack spacing={6}>
                        <Box>
                            <NextLink href="/" passHref>
                                <Link>
                                    <ImageComp
                                        src={Logo}
                                        alt={"Arica Group logo"}
                                        width={"160px"}
                                        objectFit={"contain"}
                                    />
                                </Link>
                            </NextLink>
                        </Box>
                        <Text
                            fontSize={{ sm: "sm", md: "md" }}
                            color={"text.secondary"}
                        >
                            {content.hero.description}
                        </Text>
                        <Stack direction={"row"} spacing={6}>
                            <SocialButton label={"Twitter"} href={"#"}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={"YouTube"} href={"#"}>
                                <FaLinkedin />
                            </SocialButton>
                            <SocialButton label={"Facebook"} href={"#"}>
                                <FaFacebook />
                            </SocialButton>
                            <SocialButton label={"Instagram"} href={"#"}>
                                <FaInstagram />
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
                                {content.services.irrigationNetworks.name}
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
                    <Stack align={"flex-start"} zIndex={0}>
                        <ListHeader>{content.lang.lang}</ListHeader>
                        <Select
                            value={router.locale}
                            placeholder={content.lang.lang}
                            variant={"filled"}
                            onChange={(e) => {
                                window.location.assign(`/${e.target.value}`);
                            }}
                        >
                            <option value={"ar"}>{content.lang.ar}</option>
                            <option value={"en"}>{content.lang.en}</option>
                        </Select>
                    </Stack>
                </SimpleGrid>
            </MainContainer>
        </Box>
    );
}
