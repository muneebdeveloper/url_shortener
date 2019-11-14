import Head from 'next/head';

const Meta = ()=>(
    <Head>
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        {/* <link rel="stylesheet" type="text/css" href="static/css/nprogress.css" /> */}
        <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
        <title>URL Shortner by Muneeb Akhlaq</title>
    </Head>
)

export default Meta;