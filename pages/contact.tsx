import { Heading, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetStaticProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import SectionContainer from "../components/containers/section.container";
import Footer, {
    SocialButton,
} from "../components/navigation/footer.navigation";
import SearchBar from "../components/search/searchbar";
import { get } from "../adapters";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa";

const ContactPage: NextPage = (props) => {
    //@ts-ignore
    const { content, socialMedia,brand } = props;

    return (
        <div>
            <Head>
                <title>{content.contact.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header content={content} logo={brand.attributes.logo.data.attributes.url}/>

            <Stack mt={{ base: 3, md: 7 }} mb={{ base: 4, md: 14 }}>
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
                        {/* <Heading
                        color={"text.secondary"}
                        fontSize={"md"}
                        fontWeight={400}
                        textAlign={"center"}
                        pb={4}
                    >
                        {content.contact.choose}
                    </Heading> */}
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
                </SectionContainer>
            </Stack>

            {/* Footer  */}
            <Footer content={content} brand={brand}/>
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
            brand:brand.data
        },
        revalidate: 60,
    };
};

export default ContactPage;
