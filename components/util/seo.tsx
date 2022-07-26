import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import ThumbNail from 'public/img/thumbnail.jpg';
import Script from 'next/script';

// type ThumbNail = {
//   url: string | undefined;
//   height: number;
//   width: number;
// };
const SEO: FC<{
  title: string;
  description: string | undefined;
  url: string;
  pageType: string;
}> = ({ title, description, url, pageType }) => {
  const { t } = useTranslation('common');
  const siteTitle = t('title');

  return (
    <>
      <Head>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
                `}
        </Script>
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
              url: `${process.env.NEXT_PUBLIC_HOST}${ThumbNail.src}`,
              width: 1200,
              height: 630,
              alt: `ロンギヌスの槍を投げ放題サイトのサムネイル画像`
            }
          ],
          site_name: siteTitle
        }}
        twitter={{
          site: ' ',
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
