import React from 'react'

import { withSiteData, withRouteData } from 'react-static'
import { Episode, FMType } from '../types'
import { Anchor, Box, Image, Paragraph } from 'grommet'
import Page from '@src/Page'
import Header from '@src/components/Header'
import Player from '@src/components/Player'
import Footer from '@src/components/Footer'
import Listen from '@src/components/Listen'
import DownloadBar from '@src/components/DownloadBar'
import ShowNotes from '@src/components/ShowNotes'

type Props = {
  frontmatters: FMType[]
  content: Episode
  title: string
  description: string
  myURL: string
  image: string
}
export default withSiteData(
  withRouteData(
    ({ content: episode, myURL, image, title, description }: Props) => {
      return episode ? (
        <Page>
          <Box gap="medium">
            <Header
              content={episode}
              siteData={{
                title,
                description,
                myURL: `${myURL}/${episode.frontmatter.slug}`,
                image: episode.frontmatter.art
                  ? `${myURL}/${episode.frontmatter.art}`
                  : image,
              }}
              twitterCard={`${myURL}/card/${episode.frontmatter.slug}`}
            />

            <Box direction="row-responsive" wrap flex="grow">
              <Listen />
              <Box
                align="center"
                flex
                gap="xsmall"
                pad={{ horizontal: 'medium' }}
              >
                <DownloadBar />
                <Player episode={episode} />
                {episode.frontmatter.art && (
                  <Box
                    elevation="large"
                    width="300px"
                    height="300px"
                    flex="grow"
                    margin={{ top: 'medium' }}
                  >
                    <Image
                      src={`/${episode.frontmatter.art}`}
                      alt="Episode Art"
                      fit="contain"
                    />
                  </Box>
                )}
                <ShowNotes episode={episode} />
                <hr />
                <Paragraph
                  style={{ maxWidth: '100%', width: '100%' }}
                  alignSelf="center"
                  textAlign="center"
                >
                  Our theme music is{' '}
                  <Anchor
                    href="https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1600039"
                    target="_blank"
                  >
                    District Four
                  </Anchor>
                  , by Kevin MacLeod (incompetech.com)
                  <br /> Licensed under{' '}
                  <Anchor
                    href="http://creativecommons.org/licenses/by/3.0/"
                    target="_blank"
                  >
                    Creative Commons: By Attribution 3.0 License
                  </Anchor>
                </Paragraph>
              </Box>
            </Box>
            <Footer />
          </Box>
        </Page>
      ) : null
    },
  ),
)
