import React from "react";
import Header from "../../components/navigation/header.navigation";
import Footer from "../../components/navigation/footer.navigation";
import { GetStaticProps } from "next";
import localesUtil from "../../utils/locales.util";
import { get } from "../../adapters";
import SectionContainer from "../../components/containers/section.container";
import { Grid } from "@chakra-ui/react";
import ProjectCard from "../../components/cards/project.card";
import Head from "next/head";

export default function ProjectsPage({
    content,
    brand,
    projects,
    socialMedia,
}) {
    const projectsNum = projects.length;
    return (
        <div>
            <Head>
                <title>{content.projectsSection.title}</title>
                <meta
                    name="description"
                    content={`${
                        content.projectsSection.description
                    } ${projects.map((project) => {
                        return project.attributes.title;
                    })}`}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    property="og:title"
                    content={content.projectsSection.title}
                />
                <meta
                    property="og:description"
                    content={`${
                        content.projectsSection.description
                    } ${projects.map((project) => {
                        return project.attributes.title;
                    })}`}
                />
                <meta
                    property="og:image"
                    content={
                        projects[0] &&
                        projects[0].attributes.thumbnail.data.attributes.url
                    }
                />
            </Head>
            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
                projectsNum={projectsNum}
            />
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
            </SectionContainer>
            {/* Footer  */}
            <Footer
                content={content}
                brand={brand}
                socialMedia={socialMedia}
                projectsNum={projectsNum}
            />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);

    const projects = await get("/projects?populate[thumbnail]=*", ctx.locale);

    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);

    if (projects.data.length == 0) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            content,
            brand: brand.data,

            projects: projects.data,

            socialMedia: data.attributes,
        },
        revalidate: 30,
    };
};
