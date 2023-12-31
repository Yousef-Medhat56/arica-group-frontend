import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import localesUtil from "../utils/locales.util";

//components
import Header from "../components/navigation/header.navigation";
import Hero from "../components/sections/landing-page/hero.section";
import MainContainer from "../components/containers/main.container";

//adapters
import { get } from "../adapters/index";

//Page sections
import Clients from "../components/sections/landing-page/clients.section";
import ServicesSection from "../components/sections/landing-page/services.section";
import GallerySection from "../components/sections/landing-page/gallery.section";
import ReviewSection from "../components/sections/landing-page/reviews.section";
import BestOffersSection from "../components/sections/landing-page/offers.section";
import ScrollUpButton from "../components/buttons/scroll-up.button";
import qs from "qs";
import Footer from "../components/navigation/footer.navigation";
import StatsSection from "../components/sections/landing-page/stats.section";
import ProjectsSection from "../components/sections/landing-page/projects.section";

const Home: NextPage = (props) => {
    const {
        //@ts-ignore
        content,
        //@ts-ignore
        brand,
        //@ts-ignore
        featuredClients,
        //@ts-ignore
        galleryImages,
        //@ts-ignore
        projects,
        //@ts-ignore
        reviews,
        //@ts-ignore
        offers,
        //@ts-ignore
        stats,
        //@ts-ignore
        services,
        //@ts-ignore
        socialMedia,
    } = props;

    const projectsNum = projects.length;
    
    const heroHasImg = brand.attributes.hero_image.data
        ? true
        : false;
    return (
        <div>
            <Head>
                <title>{content.landingTitle}</title>
                <meta
                    name="description"
                    content={`${brand.attributes.highlighted_text}. ${brand.attributes.black_bold_text}`}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content={content.landingTitle} />
                <meta
                    property="og:description"
                    content={`${brand.attributes.highlighted_text}. ${brand.attributes.black_bold_text}`}
                />
                <meta
                    property="og:image"
                    content={brand.attributes.logo.data.attributes.url}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header
                content={content}
                logo={brand.attributes.logo.data.attributes.url}
                projectsNum={projectsNum}
            />
            <MainContainer
                backgroundImage={
                    heroHasImg
                        ? `url(${brand.attributes.hero_image.data.attributes.url})`
                        : ""
                }
                className={heroHasImg && "hero-image"}
            >
                <Hero content={content} brand={brand} />
            </MainContainer>
            {/* Featured clients  */}
            {featuredClients.length > 3 && (
                <Clients
                    sectionHead={content.featuredClients.heading}
                    sectionDesc={content.featuredClients.description}
                    companies={featuredClients}
                />
            )}
            {/* STATS section  */}
            <StatsSection content={content} stats={stats} />
            {/* Our services section  */}
            <ServicesSection content={content} services={services} />
            {/* Gallery section  */}
            <GallerySection content={content} images={galleryImages} />

            {/* Offers Section */}
            <BestOffersSection content={content} offers={offers} />
            {/* Projects section  */}
            {projects.length > 2 && (
                <ProjectsSection content={content} projects={projects} />
            )}
            {/* Reviews Section */}
            <ReviewSection content={content} reviews={reviews} />
            {/* scroll to up button  */}
            <ScrollUpButton />
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

export const getStaticProps: GetStaticProps = async (ctx) => {
    const content = localesUtil(ctx);
    const featuredClients = await get(
        "/featured-clients?populate=*",
        ctx.locale
    );

    const galleryImages = await get("/galleries?populate=*", ctx.locale);

    const projects = await get("/projects?populate[thumbnail]=*", ctx.locale);

    const reviews = await get("/reviews", ctx.locale);

    const stats = await get("/statistic?populate=*", ctx.locale);

    const offersQuery = qs.stringify({
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
        pagination: {
            start: 0,
            limit: 10,
        },
    });
    const offers = await get(
        `/offers?${offersQuery}&sort=discount%3Adesc`,
        ctx.locale
    );
    const services = await get(`/services-description`, ctx.locale);
    const brand = await get(`/brand?populate=*`, ctx.locale);
    const { data } = await get(`/social-media`);

    return {
        props: {
            content,
            brand: brand.data,
            featuredClients: featuredClients.data,
            galleryImages: galleryImages.data,
            projects: projects.data,
            reviews: reviews.data,
            stats: stats.data.attributes,
            offers: offers.data,
            services: services.data,
            socialMedia: data.attributes,
        },
        revalidate: 30,
    };
};
export default Home;
