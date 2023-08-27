import React from "react";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import SectionContainer from "../../containers/section.container";
import OfferCard from "../../cards/offer.card";
import ViewOnScroll from "../../animation/view-on-scroll.animation";
import GradientButton from "../../buttons/gradient.button";

export default function BestOffersSection({
    content,
    offers,
}: {
    content: any;
    offers: any[];
}) {
    return offers.length ? (
        <ViewOnScroll>
            <SectionContainer
                heading={content.offersSection.heading}
                description={content.offersSection.description}
            >
                <Grid
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                    }}
                    gap={14}
                >
                    {/* show details of first 4 offers */}
                    {offers.slice(0, 4).map((offer, index) => (
                        <OfferCard
                            key={index}
                            id={offer.id }
                            content={content}
                            imgSrc={offer.attributes.image.data.attributes.url}
                            title={offer.attributes.title}
                            description={offer.attributes.description}
                            discount={offer.attributes.discount}
                            startDate={offer.attributes.start_date}
                            endDate={offer.attributes.end_date}
                            serviceName={
                                offer.attributes.service.data.attributes.name
                            }
                            serviceColor={
                                offer.attributes.service.data.attributes.color
                            }
                            accessoryType={offer.attributes.accessory_type.data}
                            priceBefore={offer.attributes.price_before_discount}
                        />
                    ))}
                </Grid>
                {/* if there are more than 4 offers, show (view more) button */}
                {offers.length > 4 && (
                    <Center marginTop={16}>
                        <GradientButton
                            text={content.offersSection.viewMore}
                            href="/offers"
                            // @ts-ignore
                            paddingX={{ base: "32px", md: "48px" }}
                        />
                    </Center>
                )}
            </SectionContainer>
        </ViewOnScroll>
    ) : (
        <></>
    );
}
