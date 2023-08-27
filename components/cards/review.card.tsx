import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LeftQuoteIcon, RightQuoteIcon } from "../icons/quotes.icon";
import { FacebookRoundedIcon } from "../icons/socialmedia.icon";

interface ReviewCardProps {
    reviewBody: string;
    name: string;
    reviewUrl: string;
}
export default function ReviewCard({
    reviewBody,
    name,
    reviewUrl,
}: ReviewCardProps) {
    const quoteIconsStyle = { width: "40px", height: "32px" };
    const router = useRouter();
    const isEnglish = router.locale === "en";
    return (
        <VStack maxWidth={"600px"} margin="auto" spacing={8}>
            <VStack spacing={4}>
                <HStack
                    width={"full"}
                    justifyContent={isEnglish ? "start" : "end"}
                >
                    {isEnglish ? (
                        <RightQuoteIcon
                            w={quoteIconsStyle.width}
                            h={quoteIconsStyle.height}
                        />
                    ) : (
                        <LeftQuoteIcon
                            w={quoteIconsStyle.width}
                            h={quoteIconsStyle.height}
                        />
                    )}
                </HStack>

                <Text color={"text.secondary"} textAlign="center">
                    {reviewBody}
                </Text>
                <HStack
                    width={"full"}
                    justifyContent={isEnglish ? "end" : "start"}
                >
                    {isEnglish ? (
                        <LeftQuoteIcon
                            w={quoteIconsStyle.width}
                            h={quoteIconsStyle.height}
                        />
                    ) : (
                        <RightQuoteIcon
                            w={quoteIconsStyle.width}
                            h={quoteIconsStyle.height}
                        />
                    )}
                </HStack>
            </VStack>
            <Link href={reviewUrl} isExternal>
                <HStack>
                    <FacebookRoundedIcon w="24px" h="24px" />
                    <Text>{name}</Text> <ExternalLinkIcon />
                </HStack>
            </Link>
        </VStack>
    );
}
