import React from 'react'
import { Box, Paragraph } from 'grommet'
import { Episode } from '../types'
import styled from 'styled-components'
import { withRouteData } from 'react-static'

type Props = { content?: Episode; episode?: Episode }
export default withRouteData(({ content, episode }: Props) => {
  const ep = episode || content
  if (!ep || !ep.body) return 'no content'
  return (
    <Container fill>
      <Paragraph
        key={ep.frontmatter.slug}
        style={{ maxWidth: '100%', width: '100%' }}
      >
        <div dangerouslySetInnerHTML={{ __html: ep.body }} />
      </Paragraph>
    </Container>
  )
})

const Container = styled(Box)`
  blockquote {
    padding-left: 20px;
    border-left: 1px solid #ccc;
  }
  li {
    margin: 10px 0;
  }
  table {
    border-collapse: collapse;
    margin: 10px auto;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.2);
    td,
    th {
      padding: 5px 10px;
      border: 1px solid #999;
    }
  }
`
