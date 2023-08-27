import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        const { locale } = this.props.__NEXT_DATA__;
        const dir = locale === "ar" ? "rtl" : "ltr";
        return (
            <Html>
                <Head>
                    {/* Fonts */}
                    <link
                        rel="preload"
                        href="/fonts/Montserrat-Arabic Black 900.otf"
                        as="font"
                        type="font/otf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Montserrat-Arabic Bold 700.otf"
                        as="font"
                        type="font/otf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Montserrat-Arabic Regular 400.otf"
                        as="font"
                        type="font/otf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Montserrat-Arabic Light 300.otf"
                        as="font"
                        type="font/otf"
                        crossOrigin=""
                    />
                </Head>
                <body dir={dir} lang={locale}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
