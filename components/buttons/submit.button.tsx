import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SubmitButtonProps {
    text: string;
    href: string;
    submitHandler: () => void;
    rest?: [x: string | boolean];
}
export default function SubmitButton({
    text,
    href,
    submitHandler,
    ...rest
}: SubmitButtonProps) {
    return (
        <Button
            loadingText="Submitting"
            size="lg"
            colorScheme="whatsapp"
            color={"white"}
            bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
            onClick={submitHandler}
            px={8}
            borderRadius={"md"}
            _hover={{}}
            {...rest}
        >
            {text}
        </Button>
    );
}
