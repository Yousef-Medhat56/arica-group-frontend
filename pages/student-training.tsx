import {
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    FormErrorMessage,
    useDisclosure,
    Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "../components/navigation/header.navigation";
import { GetStaticProps, NextPage } from "next";
import localesUtil from "../utils/locales.util";
import SectionContainer from "../components/containers/section.container";
import SubmitButton from "../components/buttons/submit.button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { get, post } from "../adapters";
import SuccesSubmitModal from "../components/modals/success-submit.modal";
import Footer from "../components/navigation/footer.navigation";
import FlowersPattern from "../components/misc/flowers-pattern.misc";

const TrainingRequestPage: NextPage = (props) => {
    //@ts-ignore
    const { content, brand, socialMedia, projectsNum } = props;

    const schema = yup.object().shape({
        name: yup
            .string()
            .required(content.trainingRequest.errors.name.required),
        phone: yup
            .string()
            .required(content.trainingRequest.errors.phone.required)
            .min(11, content.trainingRequest.errors.phone.invalid),
        email: yup
            .string()
            .email()
            .required(content.trainingRequest.errors.email.required),
        address: yup
            .string()
            .required(content.trainingRequest.errors.address.required),

        college: yup
            .string()
            .required(content.trainingRequest.errors.college.required),
        experience: yup
            .string()
            .required(content.trainingRequest.errors.experience.required),
    });

    type TrainingRequestFormInputs = {
        name: string;
        phone: string;
        email: string;
        address: string;
        college: string;
        experience: string;
    };
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<TrainingRequestFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    //Modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onSubmit = async (values: TrainingRequestFormInputs) => {
        try {
            const data = await post("/student-training-requests", values);

            if (data) {
                reset({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    college: "",
                    experience: "",
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
                <title>{content.trainingRequest.title}</title>
                <meta
                    name="description"
                    content={`${content.trainingRequest.description}`}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    property="og:title"
                    content={content.trainingRequest.title}
                />
                <meta
                    property="og:description"
                    content={`${content.trainingRequest.description}`}
                />
                <meta
                    property="og:image"
                    content={brand.attributes.logo.data.attributes.url}
                />
            </Head>
            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
                projectsNum={projectsNum}
            />

            <SectionContainer
                heading={content.trainingRequest.heading}
                description={content.trainingRequest.description}
            >
                <Stack mx={"auto"} maxW={"xl"} px={{ base: 0, md: 6 }}>
                    <Box
                        rounded={"lg"}
                        bg={"white"}
                        boxShadow={"lg"}
                        p={8}
                        zIndex={1}
                    >
                        <Stack spacing={4}>
                            <FormControl
                                id="name"
                                isRequired
                                isInvalid={!!errors?.name?.message}
                            >
                                <FormLabel>
                                    {content.trainingRequest.name}
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
                                            {content.trainingRequest.phone}
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
                                            {content.trainingRequest.email}
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
                                    {content.trainingRequest.address}
                                </FormLabel>
                                <Input type="text" {...register("address")} />
                                <FormErrorMessage>
                                    {errors?.address?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                id="college"
                                isRequired
                                isInvalid={!!errors?.college?.message}
                            >
                                <FormLabel>
                                    {content.trainingRequest.college}
                                </FormLabel>
                                <Input type="text" {...register("college")} />
                                <FormErrorMessage>
                                    {errors?.college?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id="experience"
                                isInvalid={!!errors?.experience?.message}
                                isRequired
                            >
                                <FormLabel>
                                    {content.trainingRequest.experience}
                                </FormLabel>
                                <Textarea {...register("experience")} />
                            </FormControl>

                            {/* <FormControl
                                id="address"
                                isRequired
                                isInvalid={!!errors?.address?.message}
                            >
                                <FormLabel>
                                    {content.trainingRequest.address}
                                </FormLabel>
                                <Input type="text" {...register("address")} />
                                <FormErrorMessage>
                                    {errors?.address?.message}
                                </FormErrorMessage>
                            </FormControl> */}

                            <Stack spacing={10} pt={2}>
                                <SubmitButton
                                    text={content.trainingRequest.submit}
                                    submitHandler={handleSubmit(onSubmit)}
                                    // @ts-ignore
                                    disabled={
                                        !!errors.name ||
                                        !!errors.email ||
                                        !!errors.address ||
                                        !!errors.phone ||
                                        !!errors.college ||
                                        !!errors.experience
                                    }
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                <FlowersPattern />
            </SectionContainer>
            <SuccesSubmitModal
                isOpen={isOpen}
                onClose={onClose}
                content={content}
            />
            {/* Footer  */}
            <Footer
                content={content}
                brand={brand}
                socialMedia={socialMedia}
                projectsNum={projectsNum}
            />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);
    const projects = await get("/projects", ctx.locale);

    return {
        props: {
            content,
            brand: brand.data,
            socialMedia: data.attributes,
            projectsNum: projects.data.length,
        },
        revalidate: 60 * 5,
    };
};

export default TrainingRequestPage;
