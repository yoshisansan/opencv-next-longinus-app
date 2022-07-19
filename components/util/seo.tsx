import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { VFC } from 'react'

// type ThumbNail = {
//   url: string | undefined;
//   height: number;
//   width: number;
// };
const SEO: VFC<{
  title: string;
  description: string | undefined;
  url: string;
  pageType: string;
}> = ({ title, description, url, pageType }) => {
  const siteTitle = 'ロンギヌスの槍を投げ放題サイト';
  // const subTitle = 'お金をかけない独学Webサービス開発';

  return (
    <>
      <Head>
      {/* <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      /> */}
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      /> */}
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
          description,
          type: pageType,
          images: [
            {
              url: 'https://nora-dev.com/images/nora-dev.png',
              width: 1200,
              height: 630,
              alt: `aminosan.appのサムネイル画像`
            }
          ],
          site_name: siteTitle
        }}
        twitter={{
          site: '@akifumiyoshimu',
          cardType: 'summary_large_image'
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico'
          },
          {
            rel: 'apple-touch-icon',
            href: 'https://www.test.ie/touch-icon-ipad.jpg',
            sizes: '76x76'
          }
        ]}
      />
    </>
  );
};
export default SEO;
