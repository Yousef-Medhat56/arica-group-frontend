import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface GradientButtonProps {
    text: string;
    href: string;
    rest?: [x: string];
}
export default function GradientButton({
    text,
    href,
    ...rest
}: GradientButtonProps) {
    const router = useRouter();
    const clickHandler = () => {
        router.push(href);
    };
    return (
        <Button
            fontSize={"md"}
            fontWeight={400}
            colorScheme="whatsapp"
            color={"white"}
            bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
            onClick={clickHandler}
            px={8}
            borderRadius={"3xl"}
            _hover={{}}
            {...rest}
        >
            {text}
        </Button>
    );
}
