import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import MainContainer from "./main.container";
import SectionHeader from "../misc/section-header.misc";

export default function SectionContainer({
    heading,
    description,
    bgColor,
    children,
    py,
}: {
    heading: string;
    description?: string;
    bgColor?: string;
    children: ReactNode;
    py?: any;
}) {
    return (
        <MainContainer bg={bgColor || "white"}>
            <Box py={py ? py : 16}>
                <SectionHeader heading={heading} description={description} />
                {children}
            </Box>
        </MainContainer>
    );
}
