import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILSEARCH_HOST as string,
    apiKey: process.env.NEXT_PUBLIC_MEILSEARCH_KEY as string,
});

export const search = async (query: string) => {
    const response = await client.index("products").search(query);
    return response;
};
