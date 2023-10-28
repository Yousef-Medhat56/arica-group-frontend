import { Heading, Icon, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetStaticProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import SectionContainer from "../components/containers/section.container";
import Footer, {
    SocialButton,
} from "../components/navigation/footer.navigation";
import { get } from "../adapters";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlinePhone } from "react-icons/ai";
const ContactPage: NextPage = (props) => {
    //@ts-ignore
    const { content, socialMedia, brand } = props;

    return (
        <div>
            <Head>
                <title>{content.contact.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
            />

            <Stack mt={{ base: 3, md: 7 }} mb={{ base: 4, md: 12 }}>
                <SectionContainer
                    heading={content.contact.heading}
                    description={content.contact.description}
                >
                    <Stack
                        mx={"auto"}
                        maxW={"xl"}
                        align={"center"}
                        px={{ base: 0, md: 6 }}
                    >
                        <Stack direction={"row"} alignItems={"center"} mb={{base:4,md:6}}>
                            <Icon
                                as={AiOutlinePhone}
                                height={8}
                                width={8}
                                color={"brand.bg.green.light"}
                            />

                            <Text
                                // color={"text.secondary"}
                                fontSize={{ base: "lg", md: "xl" }}
                            >
                                {socialMedia.phone}
                            </Text>
                        </Stack>
                        <Stack
                            direction={"row"}
                            spacing={6}
                            className="socialMediaIcons"
                        >
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
                                <FaXTwitter />
                            </SocialButton>
                            <SocialButton
                                label={"Linkedin"}
                                href={socialMedia.linkedin}
                            >
                                <FaLinkedin />
                            </SocialButton>
                        </Stack>
                    </Stack>
                </SectionContainer>
            </Stack>

            {/* Footer  */}
            <Footer content={content} brand={brand} socialMedia={socialMedia} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const { data } = await get(`/social-media`);
    const brand = await get(`/brand?populate=*`, ctx.locale);
    return {
        props: {
            content,
            socialMedia: data.attributes,
            brand: brand.data,
        },
        revalidate: 60,
    };
};

export default ContactPage;
