import React from 'react';
import { Anchor, Box, Heading, Image } from 'grommet';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Share from '@src/components/Share';
import { withRouteData } from 'react-static';
import { Favicon } from './Favicon';
export default withRouteData(Header);
const Title = styled(Anchor) `
  &:hover {
    text-decoration: none;
  }
`;
const Art = styled(Image).attrs({ src: '/art300.jpg', width: 300 }) ``;
function Header({ siteData, content }) {
    const { title, description, myURL, image } = siteData;
    const titleHead = content && content.frontmatter.episode ? content.frontmatter.title : title;
    const desc = content ? content.frontmatter.description : description;
    return (<Box tag="header" direction="row-responsive" wrap flex="grow">
      <Helmet>
        <meta charSet="utf-8"/>
        <title>{titleHead}</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137049034-1"/>
        <script dangerouslySetInnerHTML={{
        __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-137049034-1');
`,
    }}/>
        <meta property="og:type" content="article"/>
        <meta property="og:title" content={titleHead}/>
        <meta property="og:description" content={desc}/>
        <meta property="og:image" content={image}/>
        <meta property="og:url" content={myURL}/>
        <meta property="og:site_name" content={title}/>
        <meta name="twitter:title" content={titleHead}/>
        <meta name="twitter:description" content={desc}/>
        <meta name="twitter:image" content={image}/>
        <meta name="twitter:site" content="@seekjusticefm"/>
        <meta name="twitter:creator" content="@seekjusticefm"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <link rel="stylesheet" href="https://unpkg.com/@cassette/player@2.0.0-alpha.30/dist/css/cassette-player.min.css"/>
        <Favicon rel="apple-touch-icon" size="57x57"/>
        <Favicon rel="apple-touch-icon" size="60x60"/>
        <Favicon rel="apple-touch-icon" size="72x72"/>
        <Favicon rel="apple-touch-icon" size="76x76"/>
        <Favicon rel="apple-touch-icon" size="114x114"/>
        <Favicon rel="apple-touch-icon" size="120x120"/>
        <Favicon rel="apple-touch-icon" size="144x144"/>
        <Favicon rel="apple-touch-icon" size="152x152"/>
        <Favicon rel="apple-touch-icon" size="180x180"/>
        <Favicon rel="icon" type="image/png" size="192x192"/>
        <Favicon rel="icon" type="image/png" size="32x32"/>
        <Favicon rel="icon" type="image/png" size="96x96"/>
        <Favicon rel="icon" type="image/png" size="16x16"/>
        <link rel="manifest" href="/favicon/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>
      </Helmet>

      <Box align="center">
        <a href="/">
          <Box elevation="medium" width="300px">
            <Art />
          </Box>
        </a>
      </Box>
      <Box align="center" flex gap="xsmall" margin="medium">
        <Heading margin="xsmall">
          <Title href={myURL} label={title}/>
        </Heading>
        <Heading level="3" margin="xsmall">
          {description}
        </Heading>
        <Share title={title} author="seekjusticefm" url={myURL}/>
      </Box>
    </Box>);
}
//# sourceMappingURL=index.jsx.map