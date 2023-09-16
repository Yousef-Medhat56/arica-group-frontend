import "instantsearch.css/themes/algolia-min.css";
import React from "react";
import {
    InstantSearch,
    InfiniteHits,
    SearchBox,
    Configure,
    connectStateResults,
} from "react-instantsearch-dom";

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { useRouter } from "next/router";

const searchClient = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILSEARCH_HOST,
    process.env.NEXT_PUBLIC_MEILSEARCH_KEY
);
export default function SearchBar() {
    return (
        <div className="ais-InstantSearch">
            <InstantSearch indexName={"products"} searchClient={searchClient}>
                <Configure hitsPerPage={6} />
                <div dir="ltr">
                    <SearchBox />
                </div>
                <Results />
            </InstantSearch>
        </div>
    );
}

const Results = connectStateResults(({ searchState }) =>
    searchState && searchState.query ? (
        <InfiniteHits hitComponent={Hit} />
    ) : //<div>No query</div>
    null
);

const Hit = ({ hit }) => {
    const firstWord = hit._meilisearch_id.split("-")[0];
    const isOffer = firstWord == "offer";

    return (
        <>
            {isOffer ? (
                <OfferHit hit={hit} />
            ) : (
                <ServiceHit hit={hit} serviceType={firstWord} />
            )}
        </>
    );
};
const OfferHit = ({ hit }) => {
    const router = useRouter();
    const currentDate = new Date();
    const offerStartDate = new Date(hit.start_date);
    const offerEndDate = new Date(hit.end_date);

    const isOfferAvailable =
        currentDate >= offerStartDate && currentDate <= offerEndDate;

    const locale = router.locale;
    return (
        <>
            {isOfferAvailable ? (
                <button onClick={() => router.push(`/offers/${hit.id}`)}>
                    <h1>
                        {locale == "en" && hit.localizations.length
                            ? hit.localizations[0].title
                            : hit.title}
                    </h1>
                </button>
            ) : null}
        </>
    );
};
const ServiceHit = ({
    hit,
    serviceType,
}: {
    hit: any;
    serviceType: string;
}) => {
    const router = useRouter();
    const serviceObj = {
        servicePath: "",
        serviceMsg: "",
    };

    switch (serviceType) {
        case "gardens":
            serviceObj.servicePath = "/gardens";
            serviceObj.serviceMsg = "تعرف على خدمات الحدائق التي نقدمها";
            break;
        case "swimming":
            serviceObj.servicePath = "/swimming-pools";
            serviceObj.serviceMsg = "تعرف على خدمات حمامات السباحة التي نقدمها";
            break;
        case "fountains":
            serviceObj.servicePath = "/fountains";
            serviceObj.serviceMsg =
                "تعرف على خدمات النوافير والشلالات التي نقدمها";
            break;
        case "irrigation":
            serviceObj.servicePath = "/irrigation-networks";
            serviceObj.serviceMsg = "تعرف على خدمات شبكات الري التي نقدمها";
            break;
        case "electricity":
            serviceObj.servicePath = "/electricity-networkss";
            serviceObj.serviceMsg = "تعرف على خدمات شبكات الكهرباء التي نقدمها";
            break;
    }

    return (
        <button onClick={() => router.push(`/${serviceObj.servicePath}`)}>
            <h1>{serviceObj.serviceMsg}</h1>
        </button>
    );
};
