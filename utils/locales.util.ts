import path from "path";
import fs from "fs";
import { GetStaticPropsContext } from "next";

export default function localesUtil(ctx: GetStaticPropsContext): JSON {
    const { locale } = ctx;
    // locales directory path
    const localesDir = path.join(process.cwd(), "public", "locales");
    //locales file path
    const filePath = `${localesDir}/${locale}.json`;
    const buffer = fs.readFileSync(filePath);
    return JSON.parse(buffer.toString());
}
