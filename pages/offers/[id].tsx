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
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "../../components/navigation/header.navigation";
import { GetServerSideProps, NextPage } from "next";
import localesUtil from "../../utils/locales.util";
import SectionContainer from "../../components/containers/section.container";
import Footer from "../../components/navigation/footer.navigation";

import { get } from "../../adapters";

import GradientButton from "../../components/buttons/gradient.button";
import { useRouter } from "next/router";
import { checkIfOfferAvailable } from "../../utils/offer.util";
import { ClockOutlinedIcon } from "../../components/icons/clock.icon";

const SingleOfferPage: NextPage = (props) => {
    //@ts-ignore
    const { content, offerData, brand, socialMedia } = props;
    const router = useRouter();
    const offerId = router.query.id;
    const isEnglish =
        router.locale === "en" && offerData.localizations.data.length;
    const translated = isEnglish && offerData.localizations.data[0].attributes;

    return (
        <div>
            <Head>
                <title>{isEnglish ? translated.title : offerData.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
            />

            <SectionContainer
                heading={isEnglish ? translated.title : offerData.title}
            >
                <Stack
                    py={{ base: 0, md: 6 }}
                    direction={{ base: "column-reverse", md: "row" }}
                    justify={"space-around"}
                    align={"center"}
                >
                    <VStack align={"center"} pt={{ base: 4 }}>
                        <Text
                            maxW={{ base: "90%", md: "300px", lg: "350px" }}
                            color={"text.secondary"}
                            fontSize={{ base: "md", md: "18px" }}
                            pb={3}
                            textAlign={"center"}
                        >
                            {isEnglish
                                ? translated.description
                                : offerData.description}
                        </Text>
                        {offerData.discount != 0 && (
                            <Tag
                                size="md"
                                py={2}
                                borderRadius={"lg"}
                                color={"#598321"}
                                bg={"#DFF0DF"}
                                variant="solid"
                                width={"fit-content"}
                                border={"1px solid #598321"}
                            >
                                <TagLeftIcon as={ClockOutlinedIcon} />
                                <TagLabel>
                                    {content.offersSection.available}{" "}
                                    {offerData.end_date}
                                </TagLabel>
                            </Tag>
                        )}
                        {offerData.price_before_discount ? (
                            <Text
                                color={"text.primary"}
                                fontSize={{ base: "md", md: "16px" }}
                                pt={2}
                            >
                                <Text
                                    as="b"
                                    bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
                                    bgClip={"text"}
                                    fontSize={{ base: "md", md: "16px" }}
                                >
                                    {Math.floor(
                                        offerData.price_before_discount -
                                            offerData.price_before_discount *
                                                (offerData.discount / 100)
                                    )}{" "}
                                    {content.offersSection.pound}
                                </Text>{" "}
                                {offerData.discount > 0 && (
                                    <>
                                        {content.offersSection.insteadOf}
                                        {"  "}
                                        <Text as="s" color={"red.500"}>
                                            {offerData.price_before_discount}
                                        </Text>
                                    </>
                                )}
                            </Text>
                        ) : (
                            <Text
                                as="b"
                                bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
                                bgClip={"text"}
                                pt={2}
                                fontSize={{ base: "md", md: "16px" }}
                            >
                                {content.offersSection.discount}{" "}
                                {offerData.discount}%
                            </Text>
                        )}
                        <Center w={"full"} pt={{ base: 3, md: 4 }}>
                            <GradientButton
                                text={content.offerRequest.button}
                                href={`/offer-request?offer=${offerId}`}
                                // @ts-ignore
                                paddingX={{ base: "32px", md: "48px" }}
                            />
                        </Center>
                    </VStack>
                    <Box maxW={{ base: "350px", md: "60%", lg: "45%" }}>
                        <Image
                            src={offerData.image.data.attributes.url}
                            alt={offerData.title}
                            borderRadius={"md"}
                        />
                    </Box>
                </Stack>
            </SectionContainer>

            {/* Footer  */}
            <Footer content={content} brand={brand} socialMedia={socialMedia} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const content = localesUtil(ctx);
    const offerId = ctx.params.id;

    try {
        const { data: offerData } = await get(
            `/offers/${offerId}?populate=*`,
            ctx.locale
        );

        if (!checkIfOfferAvailable(offerData.attributes)) throw new Error();

        const brand = await get(`/brand?populate=*`, ctx.locale);
        const { data } = await get(`/social-media`);

        return {
            props: {
                content,
                offerData: offerData.attributes,
                brand: brand.data,
                socialMedia: data.attributes,
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
};

export default SingleOfferPage;
