import React, { ReactNode } from "react";
import { Container } from "@chakra-ui/react";

interface MainContainerProps {
    children: ReactNode;
    [prop: string]: any;
}
export default function MainContainer({
    children,
    ...rest
}: MainContainerProps) {
    return (
        <Container maxW="1600px" px={{ base: 4, md: 8, xl: "120px" }} {...rest}>
            {children}
        </Container>
    );
}
