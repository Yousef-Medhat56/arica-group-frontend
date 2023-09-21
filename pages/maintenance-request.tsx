import {
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    FormErrorMessage,
    useDisclosure,
    Select,
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
import DatePickerComp from "../components/pickers/date.picker";
import TimePickerComp from "../components/pickers/time.picker";
import { formatTime } from "../utils/date.util";
import FlowersPattern from "../components/misc/flowers-pattern.misc";
import Footer from "../components/navigation/footer.navigation";

const MaintenanceRequestPage: NextPage = (props) => {
    //@ts-ignore
    const { content, brand } = props;

    const schema = yup.object().shape({
        name: yup
            .string()
            .required(content.maintenanceRequest.errors.name.required),
        phone: yup
            .string()
            .required(content.maintenanceRequest.errors.phone.required)
            .min(11, content.maintenanceRequest.errors.phone.invalid),
        email: yup
            .string()
            .email()
            .required(content.maintenanceRequest.errors.email.required),
        address: yup
            .string()
            .required(content.maintenanceRequest.errors.address.required),
        visit_date: yup
            .date()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr)),
        visit_time: yup.string(),
        call_date: yup
            .date()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr)),
        call_time: yup.string(),
        service: yup
            .string()
            .required(content.maintenanceRequest.errors.service.required),
        details: yup.string(),
    });

    type MaintenanceRequestFormInputs = {
        name: string;
        phone: string;
        email: string;
        address: string;
        visit_date: string;
        visit_time: string;
        call_date: string;
        call_time: string;
        service: string;
        details: string;
    };
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<MaintenanceRequestFormInputs>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    //Modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onSubmit = async (values: MaintenanceRequestFormInputs) => {
        try {
            values.visit_time = formatTime(values.visit_time);
            values.call_time = formatTime(values.call_time);

            const data = await post("/maintainace-requests", values);

            if (data) {
                reset({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    visit_date: "",
                    visit_time: "",
                    call_date: "",
                    call_time: "",
                    service: "",
                    details: "",
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
                <title>{content.maintenanceRequest.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
            />

            <SectionContainer
                heading={content.maintenanceRequest.heading}
                description={content.maintenanceRequest.description}
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
                                    {content.maintenanceRequest.name}
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
                                            {content.maintenanceRequest.phone}
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
                                            {content.maintenanceRequest.email}
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
                                    {content.maintenanceRequest.address}
                                </FormLabel>
                                <Input type="text" {...register("address")} />
                                <FormErrorMessage>
                                    {errors?.address?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                id="service"
                                isRequired
                                isInvalid={!!errors?.service?.message}
                            >
                                <FormLabel>
                                    {content.maintenanceRequest.service}
                                </FormLabel>
                                <Select
                                    {...register("service")}
                                    id="service"
                                    defaultValue={""}
                                >
                                    <option value={""} disabled></option>
                                    <option value={"Swimming pools"}>
                                        {content.services.swimmingPools.name}
                                    </option>
                                    <option value={"Gardens"}>
                                        {content.services.designGardens.name}
                                    </option>
                                    <option value={"Fountains"}>
                                        {content.services.foundations.name}
                                    </option>
                                    <option value={"Irrigation networks"}>
                                        {
                                            content.services.irrigationNetworks
                                                .name
                                        }
                                    </option>
                                    <option value={"Electricity networks"}>
                                        {content.services.electricyNetwork.name}
                                    </option>
                                </Select>
                                <FormErrorMessage>
                                    {errors?.service?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                id="details"
                                isInvalid={!!errors?.details?.message}
                            >
                                <FormLabel>
                                    {content.maintenanceRequest.details}
                                </FormLabel>
                                <Textarea
                                    {...register("details")}
                                    placeholder={
                                        content.maintenanceRequest
                                            .detailsPlaceholder
                                    }
                                />
                            </FormControl>
                            <HStack>
                                <Box>
                                    <DatePickerComp
                                        fieldName="visit_date"
                                        register={register}
                                        control={control}
                                        label={
                                            content.maintenanceRequest
                                                .visit_date
                                        }
                                        error={errors?.visit_date?.message}
                                    />
                                </Box>
                                <Box>
                                    <TimePickerComp
                                        fieldName="visit_time"
                                        register={register}
                                        control={control}
                                        label={
                                            content.maintenanceRequest
                                                .visit_time
                                        }
                                        error={errors?.visit_time?.message}
                                    />
                                </Box>
                            </HStack>
                            <HStack>
                                <Box>
                                    <DatePickerComp
                                        fieldName="call_date"
                                        register={register}
                                        control={control}
                                        label={
                                            content.maintenanceRequest.call_date
                                        }
                                        error={errors?.call_date?.message}
                                    />
                                </Box>
                                <Box>
                                    <TimePickerComp
                                        fieldName="call_time"
                                        register={register}
                                        control={control}
                                        label={
                                            content.maintenanceRequest.call_time
                                        }
                                        error={errors?.call_time?.message}
                                    />
                                </Box>
                            </HStack>

                            {/* <FormControl
                                id="address"
                                isRequired
                                isInvalid={!!errors?.address?.message}
                            >
                                <FormLabel>
                                    {content.maintenanceRequest.address}
                                </FormLabel>
                                <Input type="text" {...register("address")} />
                                <FormErrorMessage>
                                    {errors?.address?.message}
                                </FormErrorMessage>
                            </FormControl> */}

                            <Stack spacing={10} pt={2}>
                                <SubmitButton
                                    text={content.maintenanceRequest.submit}
                                    submitHandler={handleSubmit(onSubmit)}
                                    // @ts-ignore
                                    disabled={
                                        !!errors.name ||
                                        !!errors.email ||
                                        !!errors.address ||
                                        !!errors.phone ||
                                        !!errors.service
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
            <Footer content={content} brand={brand} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const brand = await get(`/brand?populate=*`, ctx.locale);
    return {
        props: {
            content,
            brand: brand.data,
        },
        revalidate: 60 * 5,
    };
};

export default MaintenanceRequestPage;
