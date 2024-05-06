import React, { useEffect, useState } from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';
import gameOverSoundAsset from '../sounds/GameOver_Sound.wav';
import clickSoundAsset from '../sounds/Click_Sound.wav';
import ConfettiAnimation from './ConfettiAnimation';

const gameOverSound = new Audio(gameOverSoundAsset)
gameOverSound.volume = 0.3;
const clickSound = new Audio(clickSoundAsset)
clickSound.volume = 0.5;


const PLAYER_X ='X';
const PLAYER_O ='O';

const winningCombinations =[
  //Rows
  {combo:[0,1,2],strikeClass:'strike-row-1'},
  {combo:[3,4,5],strikeClass:'strike-row-2'},
  {combo:[6,7,8],strikeClass:'strike-row-3'},

 //columns
  {combo:[0,3,6],strikeClass:'strike-column-1'},
  {combo:[1,4,7],strikeClass:'strike-column-2'},
  {combo:[2,5,8],strikeClass:'strike-column-3'},

  //Diagonals
  {combo:[0,4,8],strikeClass:'strike-diagonal-1'},
  {combo:[2,4,6],strikeClass:'strike-diagonal-2'},

];

function checkWinner(tiles,setStrikeClass,setGameState){
  // console.log("check winner");
  for(const {combo,strikeClass} of winningCombinations){
    // const {combo,strikeClass}=winningCombinations;
    const tileValue1 = tiles[combo[0]]
    const tileValue2 = tiles[combo[1]]
    const tileValue3 = tiles[combo[2]]

    if(
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ){
      setStrikeClass(strikeClass);
      if(tileValue1 === PLAYER_X){
        setGameState(GameState.playerXWins);
      }
      else{
        setGameState(GameState.playerOWins);

      }
      return;
    }

  }

  const areAllTilesFilledIn = tiles.every((tile)=>tile !== null);
  if(areAllTilesFilledIn){
    setGameState(GameState.draw);
  }
}



function TicTacToe() {

const[tiles,setTiles]=useState(Array(9).fill(null));
 // State for whose turn it is
const[playerTurn,setPlayerTurn]=useState(PLAYER_X);
const[strikeClass,setStrikeClass]=useState();
const[gameState,setGameState] = useState(GameState.inProgress);
// State to control the confetti animation
const [playConfetti, setPlayConfetti] = useState(false);
let confettiTimeout;

const handleTileClick =(index)=>{
// console.log(index);
if(gameState !== GameState.inProgress){
  return;
}

if(tiles[index]!== null){
  return;
}

const newTiles = [...tiles];
newTiles[index]=playerTurn;
setTiles(newTiles)

if(playerTurn === PLAYER_X)
  {
  setPlayerTurn(PLAYER_O);
}
  else {
    setPlayerTurn(PLAYER_X);
  }
     // Update current player
    //  setCurrentPlayer(currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X);
        setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);


};

const handleReset = ()=>{
  // console.log('reset');

  setGameState(GameState.inProgress);
  setTiles(Array(9).fill(null));
  setPlayerTurn(PLAYER_X);
  setStrikeClass(null);

  // Reset confetti animation
  setPlayConfetti(false);
  // Clear any timeout set for confetti animation
  clearTimeout(confettiTimeout);
}

useEffect(()=>{
  checkWinner(tiles,setStrikeClass,setGameState);
},[tiles]);

useEffect(()=>{
  if(tiles.some((tile)=>tile !==null)){
clickSound.play();
  }
},[tiles]);

useEffect(()=>{
  if(gameState !== GameState.inProgress){
gameOverSound.play();
  }
},[gameState]);

useEffect(() => {
  // When a player wins, trigger the confetti animation
  if (gameState === GameState.playerXWins || gameState === GameState.playerOWins) {
    setPlayConfetti(true);
  }
}, [gameState]);

  return (
    <div >
      <h1>Tic Tac Toe</h1>
<div className='Turn'>
{gameState === GameState.inProgress &&    <h2 style={{fontSize:'20px' }} >Turn : Player {playerTurn}</h2>
}  
</div>      <Board 
            playerTurn={playerTurn} 

    
      // playerTurn={playerTurn} 
      tiles={tiles} 
      onTileClick={handleTileClick}
      strikeClass={strikeClass}
      ></Board>
      <GameOver gameState={gameState}></GameOver>
      <Reset gameState={gameState} onReset={handleReset}></Reset>
      <ConfettiAnimation play={playConfetti}></ConfettiAnimation>
    </div>
  )
}

export default TicTacToe