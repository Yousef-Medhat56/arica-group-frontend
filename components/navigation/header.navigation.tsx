import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useDisclosure,
    HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from "@chakra-ui/icons";
import Headroom from "react-headroom";

//components
import MainContainer from "../containers/main.container";
import ImageComp from "../misc/image.misc";
import GradientButton from "../buttons/gradient.button";

//images
import Logo from "../../public/images/logo.png";

//Nav items
import NAV_ITEMS, { NavItem } from "./nav-items.navigation";

//@ts-ignore
export default function Header({ content }) {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Headroom style={{ maxHeight: "70px" }}>
            <Box as="header" w="full" zIndex={"100"} bg="#fff">
                <MainContainer>
                    <Flex
                        bg={"white"}
                        minH={"70px"}
                        py={{ base: 2 }}
                        align="center"
                    >
                        <NextLink href="/" passHref>
                            <Link>
                                <Flex
                                    flex={{ base: 1 }}
                                    justify={"flex-start"}
                                    align={"center"}
                                >
                                    <ImageComp
                                        src={Logo}
                                        alt={"Arica Group logo"}
                                        width={"140px"}
                                        objectFit={"contain"}
                                    />
                                </Flex>
                            </Link>
                        </NextLink>
                        <Flex
                            flex={{ base: 1, lg: "auto" }}
                            justify={"flex-end"}
                            ml={{ base: -2 }}
                            display={{ base: "flex", lg: "none" }}
                        >
                            <IconButton
                                onClick={onToggle}
                                icon={
                                    isOpen ? (
                                        <CloseIcon
                                            w={3}
                                            h={3}
                                            fill="text.nav"
                                        />
                                    ) : (
                                        <HamburgerIcon
                                            w={5}
                                            h={5}
                                            fill="text.nav"
                                        />
                                    )
                                }
                                variant={"ghost"}
                                aria-label={"Toggle Navigation"}
                            />
                        </Flex>

                        <Stack
                            display={{ base: "none", lg: "flex" }}
                            flex={{ base: "auto" }}
                            justify={"flex-end"}
                            align={"center"}
                            direction={"row"}
                            spacing={5}
                        >
                            <Flex display={{ base: "none", lg: "flex" }}>
                                <DesktopNav content={content} />
                            </Flex>
                            <GradientButton
                                text={content.requests.visit}
                                href={"/visit-request"}
                            />
                        </Stack>
                    </Flex>

                    <Collapse in={isOpen} animateOpacity>
                        <MobileNav content={content} />
                    </Collapse>
                </MainContainer>
            </Box>
        </Headroom>
    );
}

//Desktop Navbar
//@ts-ignore
const DesktopNav = ({ content }) => {
    const linkColor = "text.nav";
    const linkHoverColor = "black";
    const popoverContentBgColor = "white";
    const locale = content.locale;

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS(content).map((navItem) => (
                <Box key={navItem.label}>
                    <Popover
                        trigger={"hover"}
                        placement={
                            locale == "ar" ? "bottom" : "bottom"
                        }
                    >
                        {!navItem.children ? (
                            <NextLink href={navItem.href as string} passHref>
                                <Link
                                    p={5}
                                    fontSize={"md"}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: "none",
                                        color: linkHoverColor,
                                    }}
                                >
                                    {navItem.label}
                                </Link>
                            </NextLink>
                        ) : (
                            <>
                                <PopoverTrigger>
                                    <Link
                                        p={5}
                                        fontSize={"md"}
                                        fontWeight={500}
                                        color={linkColor}
                                        _hover={{
                                            textDecoration: "none",
                                            color: linkHoverColor,
                                        }}
                                    >
                                        {navItem.label}
                                    </Link>
                                </PopoverTrigger>
                                <PopoverContent
                                    mt={3}
                                    border={0}
                                    boxShadow={"xl"}
                                    bg={popoverContentBgColor}
                                    p={4}
                                    rounded={"xl"}
                                    width="max-content"
                                >
                                    <HStack>
                                        <Stack>
                                            {/* @ts-ignore  */}
                                            {navItem.children
                                                .slice(0, 4)
                                                .map((child) => (
                                                    <DesktopSubNav
                                                        key={child.label}
                                                        locale={locale}
                                                        {...child}
                                                    />
                                                ))}
                                        </Stack>
                                        <Stack>
                                            {/* @ts-ignore  */}
                                            {navItem.children
                                                .slice(4, 9)
                                                .map((child) => (
                                                    <DesktopSubNav
                                                        key={child.label}
                                                        locale={locale}
                                                        {...child}
                                                    />
                                                ))}
                                        </Stack>
                                    </HStack>
                                </PopoverContent>
                            </>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

//Desktop Subnav
const DesktopSubNav = ({
    label,
    href,
    subLabel,
    locale,
    iconName,
}: NavItem) => {
    return (
        <NextLink href={href as string} passHref>
            <Link
                role={"group"}
                display={"block"}
                p={2}
                rounded={"md"}
                _hover={{ bg: "#EBFFEB" }}
            >
                <Stack direction={"row"} align={"center"}>
                    <Box
                        marginEnd={4}
                        padding={"4px 8px"}
                        bg="brand.bg.gray"
                        borderRadius={"lg"}
                    >
                        <ImageComp
                            src={`/icons/${iconName}`}
                            width={"36px"}
                            height="36px"
                        />
                    </Box>

                    <Box>
                        <Text
                            transition={"all .3s ease"}
                            color={"text.nav"}
                            _groupHover={{ color: "brand.bg.green.light" }}
                            fontWeight={400}
                            fontSize={"md"}
                        >
                            {label}
                        </Text>
                        <Text fontSize={"sm"} color={"text.secondary"}>
                            {subLabel}
                        </Text>
                    </Box>
                    <Flex
                        transition={"all .3s ease"}
                        transform={
                            locale == "ar"
                                ? "translateX(10px)"
                                : "translateX(-10px)"
                        }
                        opacity={0}
                        _groupHover={{
                            opacity: "100%",
                            transform: "translateX(0)",
                        }}
                        justify={"flex-end"}
                        align={"center"}
                        flex={1}
                    >
                        <Icon
                            color={"brand.bg.green.light"}
                            w={5}
                            h={5}
                            as={
                                locale == "ar"
                                    ? ChevronLeftIcon
                                    : ChevronRightIcon
                            }
                        />
                    </Flex>
                </Stack>
            </Link>
        </NextLink>
    );
};

//Mobile Nav
//@ts-ignore
const MobileNav = ({ content }) => {
    return (
        <Stack
            bg={"white"}
            p={4}
            display={{ lg: "none" }}
            zIndex="100"
            position={"relative"}
            top="0"
        >
            {NAV_ITEMS(content).map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

//Mobile Nav Item
const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <NextLink href={href ?? "#"} passHref>
                <Flex
                    py={2}
                    justify={"space-between"}
                    align={"center"}
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    <Text fontWeight={600} color={"text.primary"}>
                        {label}
                    </Text>
                    {children && (
                        <Icon
                            as={ChevronDownIcon}
                            transition={"all .25s ease-in-out"}
                            transform={isOpen ? "rotate(180deg)" : ""}
                            w={6}
                            h={6}
                        />
                    )}
                </Flex>
            </NextLink>
            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={"gray.200"}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <NextLink
                                key={child.label}
                                href={child.href as string}
                            >
                                <Link py={2} color="text.primary">
                                    {child.label}
                                </Link>
                            </NextLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};
