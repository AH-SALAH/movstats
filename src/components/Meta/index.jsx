import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AppConfig } from '@/utils/AppConfig';


const Meta = (props) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <meta charSet="UTF-8" key="charset" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                    key="viewport"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${router.basePath}/favicon-32x32.png`}
                    key="icon32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${router.basePath}/favicon-16x16.png`}
                    key="icon16"
                />
                <link
                    rel="shortcut icon"
                    href={`${router.basePath}/favicon.ico`}
                    key="favicon"
                />

                <link rel="manifest" href={`${router.basePath}/manifest.json`} />
                <meta name='theme-color' content='#312e81' />

                <meta name="msapplication-square70x70logo" content={`${router.basePath}/icons/mstile-icon-128.png`} />
                <meta name="msapplication-square150x150logo" content={`${router.basePath}/icons/mstile-icon-270.png`} />
                <meta name="msapplication-square310x310logo" content={`${router.basePath}/icons/mstile-icon-558.png`} />
                <meta name="msapplication-wide310x150logo" content={`${router.basePath}/icons/mstile-icon-558-270.png`} />

                <meta name='application-name' content={`${AppConfig.title}`} />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content={`${AppConfig.title}`} />
                <link rel="apple-touch-icon" href={`${router.basePath}/icons/apple-icon-180.png"`} key="apple" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2048-2732.png`} media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2732-2048.png`} media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1668-2388.png`} media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2388-1668.png`} media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1536-2048.png`} media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2048-1536.png`} media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1668-2224.png`} media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2224-1668.png`} media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1620-2160.png`} media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2160-1620.png`} media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1284-2778.png`} media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2778-1284.png`} media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1170-2532.png`} media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2532-1170.png`} media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1125-2436.png`} media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2436-1125.png`} media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1242-2688.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2688-1242.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-828-1792.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1792-828.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1242-2208.png`} media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-2208-1242.png`} media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-750-1334.png`} media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1334-750.png`} media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-640-1136.png`} media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href={`${router.basePath}/icons/apple-splash-1136-640.png`} media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />

            </Head>
            <NextSeo
                title={AppConfig.title + (props.title && ' | ' + props.title || '')}
                description={props.description}
                canonical={props.canonical}
                openGraph={{
                    title: props.title,
                    description: props.description,
                    url: props.canonical,
                    locale: AppConfig.locale,
                    site_name: AppConfig.site_name,
                }}
            />
        </>
    );
};

export { Meta };
