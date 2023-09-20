import {
    Center,
    Stack,
    VStack,
    Text,
    Heading,
    Container,
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../components/navigation/header.navigation";
import { GetServerSideProps, NextPage } from "next";
import localesUtil from "../../utils/locales.util";
import SectionContainer from "../../components/containers/section.container";
import Footer from "../../components/navigation/footer.navigation";

import { get } from "../../adapters";

import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import SingleItemSlider from "../../components/slider/single-item.slider";
import GalleryCard from "../../components/cards/gallery.card";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const SingleProjectPage: NextPage = (props) => {
    //@ts-ignore
    const { content, projectData } = props;
    const router = useRouter();

    return (
        <div className="overflowx-hidden">
            <Head>
                <title>{projectData.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header content={content} />

            <SectionContainer
                heading={projectData.title}
                py={{ base: 8, md: 10 }}
            >
                <VStack
                    pb={{ base: 0, md: 6 }}
                    direction={{ base: "column-reverse", md: "row" }}
                    justify={"space-around"}
                    align={"center"}
                >
                    <Stack>
                        <Center>
                            <Text
                                maxW={{
                                    base: "90vw",
                                    md: "500px",
                                    lg: "700px",
                                }}
                                color={"text.secondary"}
                                fontSize={{ base: "md", md: "18px" }}
                                pb={3}
                                textAlign={"start"}
                                className="rich-text"
                            >
                                <ReactMarkdown>
                                    {projectData.description}
                                </ReactMarkdown>
                            </Text>
                        </Center>

                        <Container
                            maxW="1600px"
                            px={{ base: 4, md: 8, xl: "300px" }}
                        >
                            <Heading
                                color={"text.primary"}
                                textAlign={"center"}
                                fontSize={{ base: "lg", md: "xl" }}
                                pt={{ base: 6, md: 10 }}
                                pb={{ base: 4, md: 6 }}
                            >
                                معرض الصور
                            </Heading>
                            <Center className="gallery-section">
                                <SingleItemSlider
                                    autoplaySpeed={3000}
                                    hasArrows={true}
                                    hasDots={true}
                                >
                                    {projectData.gallery.data.map(
                                        (image, index) => {
                                            return (
                                                <Center key={index}>
                                                    <GalleryCard
                                                        imgUrl={
                                                            image.attributes.url
                                                        }
                                                    />
                                                </Center>
                                            );
                                        }
                                    )}
                                </SingleItemSlider>
                            </Center>
                        </Container>
                    </Stack>
                    {/* <Box maxW={{ base: "350px", md: "60%", lg: "45%" }}>
                        <Image
                            src={
                                BACKEND_DOMAIN +
                                projectData.image.data.attributes.url
                            }
                            alt={projectData.title}
                            borderRadius={"md"}
                        />
                    </Box> */}
                </VStack>
            </SectionContainer>

            {/* Footer  */}
            <Footer content={content} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const content = localesUtil(ctx);
    const projectId = ctx.params.id;

    try {
        const { data } = await get(
            `/projects/${projectId}?populate=*`,
            ctx.locale
        );

        return {
            props: {
                content,
                projectData: data.attributes,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

export default SingleProjectPage;
