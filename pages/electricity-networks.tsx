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

const ElectricityNetworksPage: NextPage = (props) => {
    //@ts-ignore
    const {
        content,
        services,
        features,
    }: { content: any; services: any[]; features: any[] } = props;
    
    return (
        <div>
            <Head>
                <title>{content.electricityNetworks.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header content={content} />
            <ViewOnScroll>
                <SectionContainer
                    heading={content.electricityNetworks.heading}
                    description={content.electricityNetworks.description}
                >
                    <>
                        {/* <Heading as={"h2"} fontSize="2xl">
                            {content.electricityNetworks.know}
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

                        <Heading as={"h2"} fontSize={{base:"lg",lg:"xl"}}  marginTop={20}>
                            {content.electricityNetworks.why}
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
            <Footer content={content}/>
        </div>
    );
};

export default ElectricityNetworksPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const pageData = await get(
        `/electricity-networks-page?populate[service][populate]=*&populate[why_us][populate]=*`,
        ctx.locale
    );
   
    return {
        props: {
            content,
            services: pageData.data.attributes.service,
            features: pageData.data.attributes.why_us,
        },
        revalidate: 10
    };
};
