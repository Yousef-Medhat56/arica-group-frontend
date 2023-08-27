import { Button, ComponentWithAs } from "@chakra-ui/react";
import { ReactNode } from "react";
interface WithIconButtonProps {
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    text: string;
}

export default function WithIconButton(props: WithIconButtonProps) {
    const { rightIcon, leftIcon, text } = props;
    return (
        <Button
            //@ts-ignore
            rightIcon={rightIcon && rightIcon}
            //@ts-ignore
            leftIcon={leftIcon && leftIcon}
            colorScheme="green"
            bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
            bgClip={"text"}
            variant="ghost"
            padding={0}
            _hover={{
                color: "brand.linear.from",
            }}
            _active={{}}
        >
            {text}
        </Button>
    );
}
