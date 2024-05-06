import React from 'react'

function Tile({value,onClick,playerTurn}) {

  let symbolClass = null;

  // Determine class based on value
  if (value === 'X') {
   symbolClass = 'x-symbol';
 } else if (value === 'O') {
   symbolClass = 'o-symbol';
 }


  let hoverClass =null;
  if(value == null && playerTurn != null){
    hoverClass = `${playerTurn.toLowerCase()}-hover`
  }
  return (
    <div onClick={onClick} className={`tile border ${hoverClass}`}  >
    <span className={symbolClass}>{value}</span>  

    </div>
  )
}

export default Tile
