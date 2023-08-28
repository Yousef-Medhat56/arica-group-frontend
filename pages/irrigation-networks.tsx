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

const IrrigationNetworksPage: NextPage = (props) => {
    //@ts-ignore
    const {
        content,
        services,
        features,
    }: { content: any; services: any[]; features: any[] } = props;

    return (
        <div>
            <Head>
                <title>{content.irrigationNetworks.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header content={content} />
            <ViewOnScroll>
                <SectionContainer
                    heading={content.irrigationNetworks.heading}
                    description={content.irrigationNetworks.description}
                >
                    <>
                        <Heading as={"h2"} fontSize="xl">
                            {content.irrigationNetworks.know}
                        </Heading>

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

                        <Heading as={"h2"} fontSize="xl" marginTop={20}>
                            {content.irrigationNetworks.why}
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

export default IrrigationNetworksPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const pageData = await get(
        `/irrigation-networks-page?populate[service][populate]=*&populate[why_us][populate]=*`,
        ctx.locale
    );

    return {
        props: {
            content,
            services: pageData.data.attributes.service,
            features: pageData.data.attributes.why_us,
        },revalidate: 10
    };
};
