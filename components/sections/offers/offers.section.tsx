import { Grid } from "@chakra-ui/react";
import React from "react";
import OfferCard from "../../cards/offer.card";

export default function OffersSection({
    content,
    offers,
    isAccessoriesSection,
}: {
    content: any;
    offers: any[];
    isAccessoriesSection?: boolean;
}) {
    return offers.length ? (
        <Grid
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
            }}
            // gridAutoRows={"1fr"}
            gap={14}
        >
            {offers.map((offer, index) => (
                <OfferCard
                    key={index}
                    id={offer.id}
                    content={content}
                    imgSrc={offer.attributes.image.data.attributes.url}
                    title={offer.attributes.title}
                    description={offer.attributes.description}
                    discount={offer.attributes.discount}
                    startDate={offer.attributes.start_date}
                    endDate={offer.attributes.end_date}
                    serviceName={offer.attributes.service.data.attributes.name}
                    serviceColor={
                        offer.attributes.service.data.attributes.color
                    }
                    accessoryType={offer.attributes.accessory_type.data}
                    priceBefore={offer.attributes.price_before_discount}
                    isAccessoryCard={isAccessoriesSection}
                />
            ))}
        </Grid>
    ) : (
        <></>
    );
}
