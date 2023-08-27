import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import MainContainer from "../containers/main.container";
import { useRouter } from "next/router";
export default function ScrollUpButton() {
    const router = useRouter()
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    let scrollToTop;
    //browser code
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", toggleVisible);
        scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };
    }

    return (
        <MainContainer>
            <IconButton
            zIndex={100}
                variant="solid"
                aria-label="scroll to top button"
                colorScheme={"whatsapp"}
                fontSize="20px"
                pos={"fixed"}
                bottom={"40px"}
                left={router.locale=="ar"?"30px":undefined}
                right={router.locale=="en"?"30px":undefined}
                display={visible ? "inline" : "none"}
                icon={<ArrowUpIcon />}
                bgGradient="linear(to-l, brand.linear.from, brand.linear.to)"
                color="white"
                onClick={scrollToTop}
                _hover={{
                    bg: "brand.linear.from",
                }}
                _focus={{
                    bg: "brand.linear.from",
                }}
            />
        </MainContainer>
    );
}
