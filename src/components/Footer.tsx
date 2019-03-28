import React from 'react'
import { Anchor, Box, Heading, Paragraph } from 'grommet'
import { Twitter, Facebook, Mail } from 'grommet-icons'
import styled from 'styled-components'

export default styled(Footer)`
  text-align: center;
`

function Footer() {
  return (
    <Box tag="footer" align="center" flex="grow">
      <Box align="center">
        <Heading level="2">
          <Anchor
            margin="medium"
            icon={<Mail size="large" />}
            href="mailto:seekjusticefm@gmail.com?subject=Sponsorship"
            label="Become a Sponsor"
          />
        </Heading>
      </Box>
      <Box direction="row-responsive">
        <Anchor
          margin="medium"
          icon={<Twitter />}
          href="https://twitter.com/seekjusticefm"
          label="Twitter"
        />
        <Anchor
          margin="medium"
          icon={<Facebook />}
          href="https://www.facebook.com/Seek-Justice-Podcast-328689404657995/"
          label="Facebook"
        />
        <Anchor
          margin="medium"
          icon={<Mail />}
          href="mailto:seekjusticefm@gmail.com"
          label="Email"
        />
      </Box>
      <Paragraph>
        © Copyright {new Date().getFullYear()} - Seek Justice
      </Paragraph>
    </Box>
  )
}
