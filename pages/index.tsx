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

const Home: NextPage = (props) => {
    //@ts-ignore
    const { content, featuredClients, galleryImages, reviews, offers } = props;
    return (
        <div>
            <Head>
                <title>{content.landingTitle}</title>
                <meta name="description" content="Arica Group website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header content={content} />
            <MainContainer>
                <Hero content={content} />
            </MainContainer>
            {/* Featured clients  */}
            {featuredClients.length > 4 && (
                <Clients
                    sectionHead={content.featuredClients.heading}
                    sectionDesc={content.featuredClients.description}
                    companies={featuredClients}
                />
            )}
            {/* Our services section  */}
            <ServicesSection content={content} />
            {/* Gallery section  */}
            <GallerySection content={content} images={galleryImages} />
            {/* Offers Section */}
            <BestOffersSection content={content} offers={offers} />
            {/* Reviews Section */}
            <ReviewSection content={content} reviews={reviews} />
            {/* scroll to up button  */}
            <ScrollUpButton />
            {/* Footer  */}
            <Footer content={content}/>
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

    const reviews = await get("/reviews", ctx.locale);

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

    return {
        props: {
            content,
            featuredClients: featuredClients.data,
            galleryImages: galleryImages.data,
            reviews: reviews.data,
            offers: offers.data,
        },
    };
};
export default Home;
