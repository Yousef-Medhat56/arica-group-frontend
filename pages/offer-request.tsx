import {
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    FormErrorMessage,
    useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetServerSideProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import SectionContainer from "../components/containers/section.container";
import SubmitButton from "../components/buttons/submit.button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { get, post } from "../adapters";
import SuccesSubmitModal from "../components/modals/success-submit.modal";
import { useRouter } from "next/router";
import Footer from "../components/navigation/footer.navigation";
import FlowersPattern from "../components/misc/flowers-pattern.misc";

const OfferRequestPage: NextPage = (props) => {
    //@ts-ignore
    const { content, brand } = props;
    const router = useRouter();
    const offerId = router.query.offer;

    const schema = yup.object().shape({
        name: yup.string().required(content.offerRequest.errors.name.required),
        phone: yup
            .string()
            .required(content.offerRequest.errors.phone.required)
            .min(11, content.offerRequest.errors.phone.invalid),
        email: yup
            .string()
            .email()
            .required(content.offerRequest.errors.email.required),
        address: yup
            .string()
            .required(content.offerRequest.errors.address.required),
    });

    type OfferRequestFormInputs = {
        name: string;
        phone: string;
        email: string;
        address: string;
    };
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<OfferRequestFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    //Modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onSubmit = async (values: OfferRequestFormInputs) => {
        try {
            const data = await post("/offer-requests", {
                ...values,
                offer: Number(offerId),
            });

            if (data) {
                reset({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                });
                onOpen();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <Head>
                <title>{content.offerRequest.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header content={content} logo={brand.attributes.logo.data.attributes.url}/>

            <SectionContainer
                heading={content.offerRequest.heading}
                description={content.offerRequest.description}
                
            >
                <Stack mx={"auto"} maxW={"xl"} px={{ base: 0, md: 6 }}>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8} zIndex={1}>
                        <Stack spacing={4}>
                            <FormControl
                                id="name"
                                isRequired
                                isInvalid={!!errors?.name?.message}
                            >
                                <FormLabel>
                                    {content.offerRequest.name}
                                </FormLabel>
                                <Input type="text" {...register("name")} />
                                <FormErrorMessage>
                                    {errors?.name?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <HStack>
                                <Box>
                                    <FormControl
                                        id="phone"
                                        isRequired
                                        isInvalid={!!errors?.phone?.message}
                                    >
                                        <FormLabel>
                                            {content.offerRequest.phone}
                                        </FormLabel>
                                        <Input
                                            type="number"
                                            {...register("phone")}
                                        />
                                        <FormErrorMessage>
                                            {errors?.phone?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        id="email"
                                        isRequired
                                        isInvalid={!!errors?.email?.message}
                                    >
                                        <FormLabel>
                                            {content.offerRequest.email}
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            {...register("email")}
                                        />
                                        <FormErrorMessage>
                                            {errors?.email?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>

                            <FormControl
                                id="address"
                                isRequired
                                isInvalid={!!errors?.address?.message}
                            >
                                <FormLabel>
                                    {content.offerRequest.address}
                                </FormLabel>
                                <Input type="text" {...register("address")} />
                                <FormErrorMessage>
                                    {errors?.address?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Stack spacing={10} pt={2}>
                                <SubmitButton
                                    text={content.offerRequest.submit}
                                    submitHandler={handleSubmit(onSubmit)}
                                    // @ts-ignore
                                    disabled={
                                        !!errors.name ||
                                        !!errors.email ||
                                        !!errors.address ||
                                        !!errors.phone
                                    }
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                <FlowersPattern/>
            </SectionContainer>
            <SuccesSubmitModal
                isOpen={isOpen}
                onClose={onClose}
                content={content}
            />
            {/* Footer  */}
            <Footer content={content} brand={brand}/>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const content = localesUtil(ctx);
    const offerId = ctx.query.offer;
    if (!offerId) {
        return {
            redirect: {
                permanent: false,
                destination: "/offers",
            },
        };
    }
    try {
        const offerData = await get(
            `/offers/${offerId}?populate=*`,
            ctx.locale
        );

        const brand = await get(
            `/brand?populate=*`,
            ctx.locale
        );
        return {
            props: {
                content,
                brand:brand.data
            },
        };
    } catch {
        return {
            redirect: {
                permanent: false,
                destination: "/offers",
            },
        };
    }
};

export default OfferRequestPage;
