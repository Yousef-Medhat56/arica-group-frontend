import { Center, Heading, Stack } from "@chakra-ui/react";
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
import GradientButton from "../components/buttons/gradient.button";

const NotFoundPage: NextPage = (props) => {
    //@ts-ignore
    const { content } = props;

    return (
        <div>
            <Head>
                <title>{content.notfound.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header content={content} />

<Center>
            <Stack  py={{ base: 28, md: 36 }}>
                <Heading
                        color={"text.secondary"}
                        fontSize={"md"}
                        fontWeight={400}
                        textAlign={"center"}
                        pb={2}
                    >
                        {content.notfound.notfound}
                    </Heading>
                    <GradientButton text={content.notfound.home} href="/"/>
            </Stack></Center>

            {/* Footer  */}
            <Footer content={content} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);

    return {
        props: {
            content,
        },
    };
};

export default NotFoundPage;
