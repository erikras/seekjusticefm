import React from 'react'
import styled from 'styled-components'
import { Episode } from '../types'
import AudioCard from 'audiocard'

type Props = {
  episode: Episode
  image?: string
  linkToShowNotes?: boolean
  autoPlay?: boolean
}

const Player = ({ episode, image, linkToShowNotes, autoPlay }: Props) => {
  return (
    <Container>
      <AudioCard
        art={
          image ||
          (episode.frontmatter.art ? `/${episode.frontmatter.art}` : undefined)
        }
        title={episode.frontmatter.title}
        source={`https://dts.podtrac.com/redirect.mp3/seekjustice.fm/media/${
          episode.frontmatter.slug
        }.mp3`}
        autoPlay={autoPlay}
        preload="none"
        link={linkToShowNotes ? `/${episode.frontmatter.slug}` : undefined}
        linkText={linkToShowNotes ? 'Show Notes' : undefined}
        skipBackSeconds={10}
        skipForwardSeconds={30}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  & > div {
    display: flex;
    flex-flow: row;
  }
`
export default Player
