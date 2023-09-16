import { Stack } from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetStaticProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import SectionContainer from "../components/containers/section.container";
import Footer from "../components/navigation/footer.navigation";
import SearchBar from "../components/search/searchbar";

const SearchPage: NextPage = (props) => {
    //@ts-ignore
    const { content } = props;

    return (
        <div>
            <Head>
                <title>{content.search.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header content={content} />
            <Stack mt={{ base: 3, md: 7 }} mb={{ base: 12, md: 14 }}>
                <SectionContainer
                    heading={content.search.heading}
                    description={content.search.description}
                >
                    <Stack
                        mx={"auto"}
                        maxW={"xl"}
                        px={{ base: 0, md: 6 }}
                        // mb={{ base: 4, md: 12 }}
                    >
                        <SearchBar />
                    </Stack>
                </SectionContainer>
            </Stack>

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

export default SearchPage;
