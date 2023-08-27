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
    const { content, offers, services } = props;
    return (
        <div>
            <Head>
                <title>{content.offersSection.title}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header content={content} />
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
            <Footer content={content}/>
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
    return {
        props: {
            content,
            offers: offers.data,
            services: services.data,
        },
    };
};
