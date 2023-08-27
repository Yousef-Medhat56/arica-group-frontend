import { Center } from "@chakra-ui/react";
import React from "react";
import ViewOnScroll from "../../animation/view-on-scroll.animation";
import ReviewCard from "../../cards/review.card";
import SectionContainer from "../../containers/section.container";
import SingleItemSlider from "../../slider/single-item.slider";

export default function ReviewSection({
    content,
    reviews,
}: {
    content: any;
    reviews: any[];
}) {
    return reviews.length ? (
        <ViewOnScroll>
            <SectionContainer
                heading={content.reviewSection.heading}
                description={content.reviewSection.description}
            >
                <Center>
                    {" "}
                    <SingleItemSlider autoplaySpeed={4000}>
                        {reviews.map((review, index) => {
                            return (
                                <Center key={index}>
                                    <ReviewCard
                                        reviewBody={review.attributes.review}
                                        name={review.attributes.name}
                                        reviewUrl={review.attributes.review_url}
                                    />
                                </Center>
                            );
                        })}
                    </SingleItemSlider>
                </Center>
            </SectionContainer>
        </ViewOnScroll>
    ) : (
        <></>
    );
}
