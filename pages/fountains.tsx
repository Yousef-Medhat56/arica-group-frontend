import { Center, Grid, Heading } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { get } from "../adapters";
import ViewOnScroll from "../components/animation/view-on-scroll.animation";
import GradientButton from "../components/buttons/gradient.button";
import ServiceExampleCard from "../components/cards/service-example.card";
import WhyUsCard from "../components/cards/whyus.card";
import SectionContainer from "../components/containers/section.container";
import Header from "../components/navigation/header.navigation";
import localesUtil from "../utils/locales.util";
import Footer from "../components/navigation/footer.navigation";

const FountainsPage: NextPage = (props) => {
    //@ts-ignore
    const {
        content,
        services,
        features,
        brand,
        socialMedia,
        projectsNum
    }: {
        content: any;
        services: any[];
        features: any[];
        brand: any;
        socialMedia: any;
        projectsNum:any
    } = props;

    return (
        <div>
            <Head>
                <title>{content.fountains.title}</title>
                <meta
                    name="description"
                    content={`${
                        content.fountains.description
                    } ${services.map((service) => {
                        return service.title;
                    })}`}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    property="og:title"
                    content={content.fountains.title}
                />
                <meta
                    property="og:description"
                    content={`${
                        content.fountains.description
                    } ${services.map((service) => {
                        return service.title;
                    })}`}
                />
                <meta
                    property="og:image"
                    content={
                        services[0] && services[0].images.data[0].attributes.url
                    }
                />
            </Head>

            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
                projectsNum={projectsNum}
            />
            <ViewOnScroll>
                <SectionContainer
                    heading={content.fountains.heading}
                    description={content.fountains.description}
                >
                    <>
                        {/* <Heading as={"h2"} fontSize="2xl">
                            {content.fountains.know}
                        </Heading> */}

                        {services.map((service, index) => {
                            return (
                                <ServiceExampleCard
                                    title={service.title}
                                    description={service.description}
                                    imgArr={service.images.data}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}

                        <Heading
                            as={"h2"}
                            fontSize={{ base: "lg", lg: "xl" }}
                            marginTop={20}
                        >
                            {content.fountains.why}
                        </Heading>
                        <Grid
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)",
                            }}
                            gap={14}
                            marginTop={14}
                        >
                            {features.map((feature, index) => {
                                return (
                                    <WhyUsCard
                                        title={feature.title}
                                        description={feature.description}
                                        iconUrl={
                                            feature.icon.data.attributes.url
                                        }
                                        key={index}
                                    />
                                );
                            })}
                        </Grid>
                        <Center marginTop={12}>
                            <GradientButton
                                href="/visit-request"
                                text={content.hero.button}
                                // @ts-ignore
                                paddingX={{ base: "32px", md: "48px" }}
                            />
                        </Center>
                    </>
                </SectionContainer>
            </ViewOnScroll>
            {/* Footer  */}
            <Footer content={content} brand={brand} socialMedia={socialMedia} projectsNum={projectsNum}/>
        </div>
    );
};

export default FountainsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const pageData = await get(
        `/fountains-page?populate[service][populate]=*&populate[why_us][populate]=*`,
        ctx.locale
    );
    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);
    const projects = await get("/projects", ctx.locale);

    return {
        props: {
            content,
            services: pageData.data.attributes.service,
            features: pageData.data.attributes.why_us,
            brand: brand.data,
            socialMedia: data.attributes,
            projectsNum:projects.data.length

        },
        revalidate: 30,
    };
};
