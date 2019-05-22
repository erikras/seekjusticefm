import React from 'react'
import { Anchor, Box, Heading, Image } from 'grommet'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import Share from '@src/components/Share'
import { withRouteData } from 'react-static'
import { Episode } from 'podcats'
import { Favicon } from './Favicon'
import { prefixMp3 } from '../../utils/prefixMp3'

export default withRouteData(Header)

interface SiteData {
  title: string
  description: string
  myURL: string
  image: string
}
interface Props {
  content?: Episode
  siteData: SiteData
  noContent?: boolean
  twitterCard: string
}

const Title = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

const Art = styled(Image).attrs({ src: '/art300.jpg', width: 300 })``

function Header({ siteData, content, noContent, twitterCard }: Props) {
  const { title, description, myURL, image } = siteData
  const titleHead =
    content && content.frontmatter.episode ? content.frontmatter.title : title
  const desc = content ? content.frontmatter.description : description
  const cardMeta = twitterCard
    ? [
        <meta key="card" name="twitter:card" content="player" />,
        <meta key="player" name="twitter:player" content={twitterCard} />,
        <meta key="width" name="twitter:player:width" content="800" />,
        <meta key="height" name="twitter:player:height" content="240" />,
        <meta
          name="twitter:player:stream"
          key="stream"
          content={prefixMp3(`${content.frontmatter.slug}.mp3`)}
        />,
        <meta
          key="content_type"
          name="twitter:player:stream:content_type"
          content="audio/mpeg"
        />,
      ]
    : []
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{titleHead}</title>
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-TW93497"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={titleHead} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={myURL} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:title" content={titleHead} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@seekjusticefm" />
        <meta name="twitter:creator" content="@seekjusticefm" />
        {cardMeta}
        {!noContent && (
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        )}
        <Favicon rel="apple-touch-icon" size="57x57" />
        <Favicon rel="apple-touch-icon" size="60x60" />
        <Favicon rel="apple-touch-icon" size="72x72" />
        <Favicon rel="apple-touch-icon" size="76x76" />
        <Favicon rel="apple-touch-icon" size="114x114" />
        <Favicon rel="apple-touch-icon" size="120x120" />
        <Favicon rel="apple-touch-icon" size="144x144" />
        <Favicon rel="apple-touch-icon" size="152x152" />
        <Favicon rel="apple-touch-icon" size="180x180" />
        <Favicon rel="icon" type="image/png" size="192x192" />
        <Favicon rel="icon" type="image/png" size="32x32" />
        <Favicon rel="icon" type="image/png" size="96x96" />
        <Favicon rel="icon" type="image/png" size="16x16" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      {noContent ? null : (
        <Box tag="header" direction="row-responsive" wrap flex="grow">
          <Box align="center">
            <a href="/">
              <Box elevation="medium" width="300px">
                <Art />
              </Box>
            </a>
          </Box>
          <Box align="center" flex gap="xsmall" margin="medium">
            <Heading margin="xsmall">
              <Title href={myURL} label={title} />
            </Heading>
            <Heading level="3" margin="xsmall">
              {description}
            </Heading>
            <Share title={title} author="seekjusticefm" url={myURL} />
          </Box>
        </Box>
      )}
    </React.Fragment>
  )
}
