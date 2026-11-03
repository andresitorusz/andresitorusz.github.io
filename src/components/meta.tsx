import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL } from 'data/constants';

type Props = {
  title: string;
  description?: string;
  noindex?: boolean;
};

export default function Meta({ title, description, noindex = false }: Props) {
  const { asPath } = useRouter();
  const url = `${SITE_URL}${asPath.split(/[?#]/)[0]}`;
  const image = `${SITE_URL}/og.png`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Andre Yehuda Sitorus — Senior Data Engineer" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <title>{title}</title>
    </Head>
  );
}
