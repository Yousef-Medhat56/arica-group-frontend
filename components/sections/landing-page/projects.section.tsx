import React from "react";
import { Center, Grid, GridItem } from "@chakra-ui/react";
import SectionContainer from "../../containers/section.container";
import ProjectCard from "../../cards/project.card";
import ViewOnScroll from "../../animation/view-on-scroll.animation";
import GradientButton from "../../buttons/gradient.button";

export default function ProjectsSection({
    content,
    projects,
}: {
    content: any;
    projects: any[];
}) {
    
    return projects.length ? (
        <ViewOnScroll>
            <SectionContainer
                heading={content.projectsSection.heading}
                description={content.projectsSection.description}
            >
                <Grid
                    templateColumns={{
                        sm: "repeat(1, 1fr)",
                        md: "repeat(3, 1fr)",
                    }}
                    gap={14}
                >
                    {/* show details of first 2 projects */}
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            id={project.id}
                            content={content}
                            imgSrc={
                                project.attributes.thumbnail.data.attributes.url
                            }
                            title={project.attributes.title}
                            description={project.attributes.breif}
                        />
                        
                    ))}
                </Grid>
                {/* if there are more than 3 projects, show (view more) button */}
                {/* {projects.length > 3 && (
                    <Center marginTop={16}>
                        <GradientButton
                            text={content.projectsSection.viewMore}
                            href="/projects"
                            // @ts-ignore
                            paddingX={{ base: "32px", md: "48px" }}
                        />
                    </Center>
                )} */}
            </SectionContainer>
        </ViewOnScroll>
    ) : (
        <></>
    );
}
