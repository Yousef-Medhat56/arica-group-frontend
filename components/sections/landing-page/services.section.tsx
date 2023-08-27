import React from "react";
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import ServiceCard from "../../cards/service.card";

//services
import NAV_ITEMS, { NavItem } from "../../navigation/nav-items.navigation";
import SectionContainer from "../../containers/section.container";
import ViewOnScroll from "../../animation/view-on-scroll.animation";

function ServicesSectionContent({ content }: { content: any }) {
    const servicesArr = NAV_ITEMS(content)[0].children as NavItem[];
    return (
        <SectionContainer
            heading={content.servicesSection.heading}
            description={content.servicesSection.description}
        >
            <Grid
                templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={14}
            >
                {servicesArr.map((service) => (
                    <GridItem w="100%" key={service.label}>
                        <ServiceCard
                            serviceName={service.label}
                            serviceDesc={service.description as string}
                            iconName={service.iconName as string}
                        />
                    </GridItem>
                ))}
            </Grid>
        </SectionContainer>
    );
}
export default function ServicesSection({ content }: { content: any }) {
    const servicesArr = NAV_ITEMS(content)[0].children as NavItem[];
    const [isSmallerThan426] = useMediaQuery("(max-width: 427px)");
    return (
        <>
            {/* {isSmallerThan426 ? (
                <ServicesSectionContent content={content} />
            ) : (
                <ViewOnScroll>
                    <ServicesSectionContent content={content} />
                </ViewOnScroll>
            )} */}
            <ServicesSectionContent content={content} />
        </>
    );
}
