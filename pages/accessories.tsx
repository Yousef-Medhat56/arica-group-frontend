import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { get } from "../adapters";
import ViewOnScroll from "../components/animation/view-on-scroll.animation";
import SectionContainer from "../components/containers/section.container";
import Header from "../components/navigation/header.navigation";
import FilterSection from "../components/sections/offers/filter.section";
import localesUtil from "../utils/locales.util";
import qs from "qs";
import OffersSection from "../components/sections/offers/offers.section";
import Footer from "../components/navigation/footer.navigation";

const OffersPage: NextPage = (props) => {
    
    const {
        //@ts-ignore
        content,
        //@ts-ignore
        accessories,
        //@ts-ignore
        accessoryTypes,
        //@ts-ignore
        brand,
        //@ts-ignore
        socialMedia,
        //@ts-ignore
        projectsNum,
    } = props;
    return (
        <div>
            <Head>
                <title>{content.accessories.title}</title>
                <meta
                    name="description"
                    content={`${
                        content.offersSection.description
                    } ${accessories.map((accessory) => {
                        return accessory.attributes.title;
                    })}`}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    property="og:title"
                    content={content.accessories.title}
                />
                <meta
                    property="og:description"
                    content={`${
                        content.offersSection.description
                    } ${accessories.map((accessory) => {
                        return accessory.attributes.title;
                    })}`}
                />
                <meta
                    property="og:image"
                    content={
                        accessories[0] && accessories[0].attributes.image.data.attributes.url
                    }
                />
            </Head>

            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
                projectsNum={projectsNum}
            />
            <ViewOnScroll>
                <SectionContainer
                    heading={content.accessories.heading}
                    description={content.offersSection.description}
                >
                    <FilterSection
                        services={accessoryTypes}
                        content={content}
                    />
                    <OffersSection
                        content={content}
                        offers={accessories}
                        isAccessoriesSection={true}
                    />
                </SectionContainer>
            </ViewOnScroll>

            {/* Footer  */}
            <Footer
                content={content}
                brand={brand}
                socialMedia={socialMedia}
                projectsNum={projectsNum}
            />
        </div>
    );
};

export default OffersPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const content = localesUtil(ctx);
    const sortOrder =
        ctx.query.sort === "asc" || ctx.query.sort === "desc"
            ? ctx.query.sort
            : "desc";
    const category = ctx.query.category;

    const specificCategoryQuery = qs.stringify(
        {
            populate: "*",
            filters: {
                accessory_type: {
                    name: {
                        $eq: category,
                    },
                },

                start_date: {
                    $lt: new Date().toISOString().slice(0, 10),
                },

                end_date: {
                    $gt: new Date().toISOString().slice(0, 10),
                },
            },
        },

        {
            encodeValuesOnly: true, // prettify URL
        }
    );

    const allCategoriesQuery = qs.stringify(
        {
            populate: "*",
            filters: {
                accessory_type: {
                    name: {
                        $notNull: true,
                    },
                },

                start_date: {
                    $lt: new Date().toISOString().slice(0, 10),
                },

                end_date: {
                    $gt: new Date().toISOString().slice(0, 10),
                },
            },
        },

        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    const endpoints = {
        specificCategory: `/offers?${specificCategoryQuery}`,
        allCategories: `/offers?${allCategoriesQuery}&sort=discount%3A${sortOrder}`,
    };

    let accessories;
    if (category && category !== "all") {
        accessories = await get(endpoints.specificCategory, ctx.locale);
    } else {
        accessories = await get(endpoints.allCategories, ctx.locale);
    }

    const accessoryTypesQuery = qs.stringify(
        {
            populate: "*",
            filters: {
                offers: {
                    id: {
                        $notNull: true,
                    },
                    start_date: {
                        $lt: new Date().toISOString().slice(0, 10),
                    },
                    end_date: {
                        $gt: new Date().toISOString().slice(0, 10),
                    },
                },
            },
        },

        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    const accessoryTypes = await get(
        `/accessory-types?${accessoryTypesQuery}`,
        ctx.locale
    );

    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);
    const projects = await get("/projects", ctx.locale);

    return {
        props: {
            content,
            brand: brand.data,
            accessories: accessories.data,
            accessoryTypes: accessoryTypes.data,
            socialMedia: data.attributes,
            projectsNum: projects.data.length,
        },
    };
};
