import {
    Box,
    Center,
    Image,
    Stack,
    VStack,
    Text,
    Tag,
    TagLeftIcon,
    TagLabel,
    Container,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import SectionContainer from "../components/containers/section.container";
import Footer from "../components/navigation/footer.navigation";

import { get } from "../adapters";

import GradientButton from "../components/buttons/gradient.button";
import { useRouter } from "next/router";
import { checkIfOfferAvailable } from "../utils/offer.util";
import { ClockOutlinedIcon } from "../components/icons/clock.icon";
import ViewOnScroll from "../components/animation/view-on-scroll.animation";
import ReactMarkdown from "react-markdown";
import ServiceCard from "../components/cards/service.card";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const AboutUsPage: NextPage = (props) => {
    //@ts-ignore
    const { content, data } = props;

    return (
        <div>
            <Head>
                {/* <title>{isEnglish ? translated.title : offerData.title}</title> */}
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header content={content} />
            {/* //OVERVIEW  */}
            <div id="overview">
                <ViewOnScroll>
                    <SectionContainer
                        heading={"الشركة في سطور"}
                        py={{ base: 8, md: 12 }}
                    >
                        <Stack
                            py={{ base: 0, md: 6 }}
                            direction={{ base: "column-reverse", md: "row" }}
                            justify={"space-around"}
                            align={"center"}
                        >
                            <Stack pt={{ base: 2, md: 4 }}>
                                <Text
                                    maxW={{
                                        base: "100%",
                                        md: "300px",
                                        lg: "450px",
                                    }}
                                    color={"text.secondary"}
                                    fontSize={{ base: "md", md: "18px" }}
                                    pb={3}
                                    textAlign={{ base: "center", md: "start" }}
                                    className="rich-text"
                                >
                                    <ReactMarkdown>
                                        {data.summary.description}
                                    </ReactMarkdown>
                                </Text>
                            </Stack>
                            <Box
                                maxW={{ base: "350px", md: "55%", lg: "40%" }}
                                display={{ base: "none", md: "block" }}
                            >
                                <Image
                                    src={
                                        BACKEND_DOMAIN +
                                        data.summary.image.data.attributes.url
                                    }
                                    alt={""}
                                    borderRadius={"md"}
                                />
                            </Box>
                        </Stack>
                    </SectionContainer>
                </ViewOnScroll>
            </div>

            {/* //HISTORY  */}
            <div id="history">
                <ViewOnScroll>
                    <SectionContainer
                        heading={"نبذة تاريخية عن الشركة"}
                        py={{ base: 8, md: 12 }}
                    >
                        <Stack
                            py={{ base: 0, md: 6 }}
                            direction={{ base: "column", md: "row-reverse" }}
                            justify={"space-around"}
                            align={"center"}
                        >
                            <Stack pt={{ base: 2, md: 4 }}>
                                <Text
                                    maxW={{
                                        base: "100%",
                                        md: "300px",
                                        lg: "450px",
                                    }}
                                    color={"text.secondary"}
                                    fontSize={{ base: "md", md: "18px" }}
                                    pb={3}
                                    textAlign={{ base: "center", md: "start" }}
                                    className="rich-text"
                                >
                                    <ReactMarkdown>
                                        {data.history.description}
                                    </ReactMarkdown>
                                </Text>
                            </Stack>
                            <Box
                                maxW={{ base: "350px", md: "55%", lg: "40%" }}
                                display={{ base: "none", md: "block" }}
                            >
                                <Image
                                    src={
                                        BACKEND_DOMAIN +
                                        data.history.image.data.attributes.url
                                    }
                                    alt={""}
                                    borderRadius={"md"}
                                />
                            </Box>
                        </Stack>
                    </SectionContainer>
                </ViewOnScroll>
            </div>
            {/* //VISION and Message  */}
            <div id="vision">
                <ViewOnScroll>
                    <SectionContainer
                        heading={"الرؤية والرسالة"}
                        py={{ base: 8, md: 12 }}
                    >
                        <Grid
                            py={{ base: 0, md: 6 }}
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                            }}
                            gap={{ base: 8, md: 14, lg: 20 }}
                        >
                            <GridItem>
                                <ServiceCard
                                    serviceName={"الرؤية"}
                                    serviceDesc={data.vision}
                                    iconName={"vision.svg"}
                                />
                            </GridItem>
                            <GridItem>
                                <ServiceCard
                                    serviceName={"الرسالة"}
                                    serviceDesc={data.message}
                                    iconName={"mission.svg"}
                                />
                            </GridItem>
                        </Grid>
                    </SectionContainer>
                </ViewOnScroll>
            </div>
            {/* //TEAM  */}
            <div id="team">
                <ViewOnScroll>
                    <SectionContainer
                        heading={"مجلس إدارة الشركة"}
                        py={{ base: 8, md: 12 }}
                    >
                        <Grid
                            py={{ base: 0, md: 6 }}
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)",
                            }}
                            gap={{ base: 6, md: 14, lg: 20 }}
                        >
                            {data.team.map((member) => (
                                <GridItem key={member.name}>
                                    <TeamMemberCard
                                        name={member.name}
                                        role={member.role}
                                        imgUrl={
                                            member.image.data.attributes.url
                                        }
                                    />
                                </GridItem>
                            ))}
                        </Grid>
                    </SectionContainer>
                </ViewOnScroll>
            </div>

            {/* Footer  */}
            <Footer content={content} />
        </div>
    );
};

const TeamMemberCard = ({
    name,
    role,
    imgUrl,
}: {
    name: string;
    role: string;
    imgUrl: string;
}) => {
    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            align={"center"}
            justifyContent={"start"}
            paddingX={3}
            paddingY={3}
            borderRadius="lg"
            transition={"0.3s ease"}
            _hover={{ background: "#F6F6F6" }}
        >
            <Image
                w={"80px"}
                h={"80px"}
                borderRadius={"full"}
                src={process.env.NEXT_PUBLIC_BACKEND_DOMAIN + imgUrl}
                alt={name}
            />

            <VStack
                align={{ base: "center", md: "start" }}
                ps={{ base: 0, md: 2 }}
                pt={{ base: 2, md: 0 }}
                justify={"center"}
            >
                <Text fontWeight={"bold"} color={"text.primary"}>
                    {name}
                </Text>
                <Text color={"text.secondary"}>{role}</Text>
            </VStack>
        </Stack>
    );
};
export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);

    const { data } = await get(
        `/about-us?populate[summary][populate]=*&populate[history][populate]=*&populate[team][populate]=*`,
        ctx.locale
    );

    return {
        props: {
            content,
            data: data.attributes,
        },
        revalidate: 30,
    };
};

export default AboutUsPage;