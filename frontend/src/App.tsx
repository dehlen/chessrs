import React, { useState } from 'react'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Chessboard from './board/Chessboard'
import { Box, ChakraProvider, Grid, GridItem, Stack } from '@chakra-ui/react'
import theme from './theme'
import BoardControlsPanel from './BoardControlsPanel'
import { ShortMove } from 'chess.js'

function App() {
  const [pgn, setPgn] = useState('')

  const handleMove = (move: ShortMove, newPgn: string) => {
    setPgn(newPgn)
  }

  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <a href={`http://localhost/api/v1/oauth2/code/lichess`} rel='noreferrer noopener'>
          Login
        </a>
        <Grid
          templateColumns='repeat(12, 1fr)'
          templateRows={{ base: 'repeat(5, 1fr)', md: 'repeat(5, 1fr)', xl: 'repeat(1, 1fr)' }}
          minH='95vh'
          gap={{ base: 0, md: 4 }}
        >
          <GridItem colSpan={{ base: 12, xl: 4 }} rowSpan={1} padding={{ base: '1%', xl: '10%' }}>
            <Box bg='gray.700' w='100%' h='100%' />
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 9, xl: 4 }} rowSpan={{ base: 3, md: 4, xl: 1 }}>
            <Chessboard onMove={handleMove} />
          </GridItem>
          <GridItem
            colSpan={{ base: 12, md: 3, xl: 4 }}
            rowSpan={{ base: 1, md: 4, xl: 1 }}
            padding={{ base: '1%', lg: '10%' }}
          >
            <BoardControlsPanel pgn={pgn} />
          </GridItem>
        </Grid>
      </DndProvider>
    </ChakraProvider>
  )
}

export default App
