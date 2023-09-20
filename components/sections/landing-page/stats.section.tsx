import {
   
    Grid,
    GridItem,
  
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import ViewOnScroll from "../../animation/view-on-scroll.animation";

import SectionContainer from "../../containers/section.container";
import Counter from "../../animation/number-counter";

export default function StatsSection({
    content,
    stats,
}: {
    content: any;
    stats: any;
}) {
   
    return (
        <ViewOnScroll>
            <SectionContainer
                heading={content.statsSection.heading}
                description={content.statsSection.description}
            >
                <Grid
                   
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap={{ base: 8, md: 12, lg: 16 }}
                >
                    {stats.stat.map((singleStat, index) => (
                        <GridItem key={index}>
                            <StatCard
                                num={singleStat.number}
                                text={singleStat.text}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </SectionContainer>
        </ViewOnScroll>
    );
}

const StatCard = ({ num, text }: { num: number; text: string }) => {
    return (
        <Stack
            align={"center"}
            justify={"center"}
            direction={{ base: "column", md: "column" }}
        >
            <Text
                as="strong"
                fontSize={{ base: "4xl", md: "5xl" }}
                bgGradient="linear(to-l, brand.linear.from,  brand.linear.to)"
                bgClip="text"
            >
                <Counter end={num} />
            </Text>
            <Text
                color={"text.secondary"}
                style={{ marginTop: "0 !important" }}
                textAlign={"center"}
            >
                {text}
            </Text>
        </Stack>
    );
};
