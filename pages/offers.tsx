import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { get } from "../adapters";
import ViewOnScroll from "../components/animation/view-on-scroll.animation";
import SectionContainer from "../components/containers/section.container";
import Header from "../components/navigation/header.navigation";
import FilterSection from "../components/sections/offers/filter.section";
import OffersSection from "../components/sections/offers/offers.section";
import localesUtil from "../utils/locales.util";
import qs from "qs";
import Footer from "../components/navigation/footer.navigation";

const OffersPage: NextPage = (props) => {
    //@ts-ignore
    const { content, offers, services, brand, socialMedia, projectsNum } =
        props;
    return (
        <div>
            <Head>
                <title>{content.offersSection.title}</title>
                <meta
                    name="description"
                    content={`${content.offersSection.description} ${offers.map(
                        (offer) => {
                            return offer.attributes.title;
                        }
                    )}`}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content={content.accessories.title} />
                <meta
                    property="og:description"
                    content={`${
                        content.offersSection.description
                    } ${offers.map((offer) => {
                        return offer.attributes.title;
                    })}`}
                />
                <meta
                    property="og:image"
                    content={
                        offers[0] &&
                        offers[0].attributes.image.data.attributes.url
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
                    heading={content.offersSection.heading}
                    description={content.offersSection.description}
                >
                    <FilterSection services={services} content={content} />
                    <OffersSection content={content} offers={offers} />
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
                service: {
                    name: {
                        $eq: category,
                    },
                },

                discount: { $gt: 0 },

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
                discount: { $gt: 0 },

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

    let offers;
    if (category && category !== "all") {
        offers = await get(endpoints.specificCategory, ctx.locale);
    } else {
        offers = await get(endpoints.allCategories, ctx.locale);
    }

    const servicesQuery = qs.stringify(
        {
            populate: "*",
            filters: {
                offers: {
                    id: {
                        $notNull: true,
                    },
                    discount: { $gt: 0 },
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
    const services = await get(`/services?${servicesQuery}`, ctx.locale);

    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);
    const projects = await get("/projects", ctx.locale);

    return {
        props: {
            content,
            offers: offers.data,
            services: services.data,
            brand: brand.data,
            socialMedia: data.attributes,
            projectsNum: projects.data.length,
        },
    };
};
