import React from 'react'
import GameState from './GameState'

function GameOver({gameState}) {

 switch(gameState){ 
    case GameState.inProgress:
        return <></>;
    case GameState.playerOWins:
        return <div className='game-over'>Congratulations O Wins!</div>;
    case GameState.playerXWins:
        return <div className='game-over'> Congratulations X Wins!</div>
    case GameState.draw:
        return <div className='game-over'> It's a Draw! Congratulations!</div>
        
        default:
            return <></>;
}

}

export default GameOver
