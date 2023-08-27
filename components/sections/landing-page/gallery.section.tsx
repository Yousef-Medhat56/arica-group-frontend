import { Center } from "@chakra-ui/react";
import React from "react";
import ViewOnScroll from "../../animation/view-on-scroll.animation";
import GalleryCard from "../../cards/gallery.card";
import SectionContainer from "../../containers/section.container";
import SingleItemSlider from "../../slider/single-item.slider";

export default function GallerySection({
    content,
    images,
}: {
    content: any;
    images: any[];
}) {
    return (
        <ViewOnScroll>
            <SectionContainer
                heading={content.gallerySection.heading}
                description={content.gallerySection.description}
            >
                <Center className="gallery-section">
                    {" "}
                    <SingleItemSlider
                        autoplaySpeed={3000}
                        hasArrows={true}
                        hasDots={true}
                    >
                        {images.map((image, index) => {
                            return (
                                <Center key={index}>
                                    <GalleryCard
                                        imgUrl={
                                            image.attributes.image.data
                                                .attributes.url
                                        }
                                        description={
                                            image.attributes.description
                                        }
                                    />
                                </Center>
                            );
                        })}
                    </SingleItemSlider>
                </Center>
            </SectionContainer>
        </ViewOnScroll>
    );
}
