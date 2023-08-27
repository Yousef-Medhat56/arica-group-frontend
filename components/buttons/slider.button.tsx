import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LeftArrowIcon, RightArrowIcon } from "../icons/arrows.icon";

interface sliderButtonProps {
    onClick: () => void;
}

export const SliderPrevArrowBtn = ({ onClick }: sliderButtonProps) => {
    const router = useRouter();

    return (
        <IconButton
            bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
            colorScheme={"green"}
            _hover={{
                background: "brand.linear.from",
            }}
            onClick={onClick}
            aria-label="Next arrow"
            size="lg"
            icon={
                router.locale == "en" ? <LeftArrowIcon /> : <RightArrowIcon />
            }
            position="absolute"
            top={"50%"}
            left={router.locale == "en" ? "0" : "100%"}
            zIndex="1"
        />
    );
};
export const SliderNextArrowBtn = ({ onClick }: sliderButtonProps) => {
    const router = useRouter();

    return (
        <IconButton
            bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
            colorScheme={"green"}
            _hover={{
                background: "brand.linear.from",
            }}
            onClick={onClick}
            aria-label="Next arrow"
            size="lg"
            icon={
                router.locale == "en" ? <RightArrowIcon /> : <LeftArrowIcon />
            }
            position="absolute"
            top={"50%"}
            right={router.locale == "en" ? "0" : "100%"}
            zIndex="1"
        />
    );
};
