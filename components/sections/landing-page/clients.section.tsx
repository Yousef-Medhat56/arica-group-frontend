import { Box } from "@chakra-ui/react";
import React from "react";
import ViewOnScroll from "../../animation/view-on-scroll.animation";
import CompanyCard from "../../cards/company.card";
import SectionHeader from "../../misc/section-header.misc";
import AutoPlaySlider from "../../slider/autoplay.slider";

interface ClientsProps {
    sectionHead: string;
    sectionDesc: string;
    companies: any[];
}
export default function Clients({
    sectionHead,
    sectionDesc,
    companies,
}: ClientsProps) {
    return (
        <ViewOnScroll>
            {" "}
            <Box
                bgColor={"brand.bg.green.medium"}
                py={12}
                className="full-slider"
            >
                <SectionHeader
                    heading={sectionHead}
                    description={sectionDesc}
                />
                <AutoPlaySlider>
                    {companies.map((company, index) => {
                        return (
                            <CompanyCard
                                key={index}
                                imgUrl={
                                    company.attributes.Logo.data.attributes.url
                                }
                                imgAlt={company.attributes.Name}
                                companyName={company.attributes.Name}
                            />
                        );
                    })}
                </AutoPlaySlider>
            </Box>
        </ViewOnScroll>
    );
}
