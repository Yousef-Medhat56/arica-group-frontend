import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FilterIcon } from "../../icons/filter.icon";

export default function FilterSection({
    services,
    content,
}: {
    services: any;
    content: any;
}) {
    const router = useRouter();
    const changeCategoryHandler = (e: any) => {
        router.query.category = e.target.value || "all";
        router.push(router);
    };
    const changeSortHandler = (e: any) => {
        router.query.sort = e.target.value || "desc";
        router.push(router);
    };

    return (
        <Stack
            marginBottom={6}
            spacing={4}
            direction={{ base: "column", md: "row" }}
        >
            <HStack>
                <FilterIcon />
                <Text color="#598321"> {content.filter.way}</Text>
            </HStack>

            <HStack minWidth={"50%"}>
                <Select
                    onChange={changeCategoryHandler}
                    rootProps={{ maxWidth: "fit-content" }}
                    borderColor={"#598321"}
                    color={"#598321"}
                    bg="#DFF0DF"
                    colorScheme={"whatsapp"}
                    value={router.query.category || ""}
                >
                    <option disabled value="">
                        {content.filter.type}
                    </option>

                    {/*@ts-ignore  */}
                    {services.map((service, index) => (
                        <option value={service.attributes.name} key={index}>
                            {service.attributes.name}
                        </option>
                    ))}
                    <option value={"all"}> {content.filter.all}</option>
                </Select>
                <Select
                    onChange={changeSortHandler}
                    rootProps={{ maxWidth: "fit-content" }}
                    borderColor={"#598321"}
                    color={"#598321"}
                    bg="#DFF0DF"
                    colorScheme={"whatsapp"}
                    value={router.query.sort || ""}
                >
                    <option disabled value="">
                        {content.filter.discount}
                    </option>
                    <option value={"desc"}>
                        {content.filter.highDiscount}
                    </option>
                    <option value={"asc"}>{content.filter.lowDiscount}</option>
                </Select>
            </HStack>
        </Stack>
    );
}
