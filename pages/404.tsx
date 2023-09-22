import { Center, Heading, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetStaticProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import Footer from "../components/navigation/footer.navigation";
import { get } from "../adapters";
import GradientButton from "../components/buttons/gradient.button";

const NotFoundPage: NextPage = (props) => {
    //@ts-ignore
    const { content, brand, socialMedia } = props;

    return (
        <div>
            <Head>
                <title>{content.notfound.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
            />

            <Center>
                <Stack py={{ base: 28, md: 36 }}>
                    <Heading
                        color={"text.secondary"}
                        fontSize={"md"}
                        fontWeight={400}
                        textAlign={"center"}
                        pb={2}
                    >
                        {content.notfound.notfound}
                    </Heading>
                    <GradientButton text={content.notfound.home} href="/" />
                </Stack>
            </Center>

            {/* Footer  */}
            <Footer content={content} brand={brand} socialMedia={socialMedia} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);

    return {
        props: {
            content,
            brand: brand.data,
            socialMedia: data.attributes,
        },
        revalidate: 60 * 5,
    };
};

export default NotFoundPage;
