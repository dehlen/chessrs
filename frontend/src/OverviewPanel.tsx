import { Flex, Text } from '@chakra-ui/layout'
import { Box, Button } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateLichessGames } from './board/boardSlice'
import { useAppSelector } from './hooks'

const OverviewPanel: FC = () => {
  const { lastMove, lichessGamesInPosition, commonMoves, fen } = useAppSelector(state => ({
    lastMove: state.board.moveHistory.length > 0 ? state.board.moveHistory[state.board.moveHistory.length - 1] : '',
    lichessGamesInPosition:
      state.board.games.lichess.white + state.board.games.lichess.draws + state.board.games.lichess.black,
    commonMoves: state.board.games.lichess.moves.map(m => m.san),
    fen: state.board.fen
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('fetching games')
    fetch(
      `https://explorer.lichess.ovh/lichess?variant=standard&speeds[]=bullet&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=1600&ratings[]=2500&fen=${fen}`
    )
      .then(result => result.json())
      .then(json => dispatch(updateLichessGames(json)))
  }, [fen, dispatch])

  return (
    <Box
      borderRadius='3px'
      bg='surface'
      borderWidth='2px'
      borderStyle='solid'
      borderColor='surfaceBorder'
      w='100%'
      h='100%'
      p='5%'
    >
      <Button isDisabled={!lastMove} isFullWidth>
        Add {lastMove || 'Move'} (A)
      </Button>
      <Text fontSize='18px' fontWeight='bold' mb='5px' mt='25px'>
        Times Reached:
      </Text>
      <Text fontSize='16px' mb='3px'>
        Lichess games: {lichessGamesInPosition}
      </Text>
      {commonMoves.length > 0 && (
        <>
          <Text fontSize='18px' fontWeight='bold' mb='5px' mt='20px'>
            Most Common Moves:
          </Text>
          {/* todo: show some stats about the moves */}
          {commonMoves.map(m => (
            <Text fontSize='16px' mb='1px' key={m}>
              {m}
            </Text>
          ))}
        </>
      )}
    </Box>
  )
}

export default OverviewPanel
