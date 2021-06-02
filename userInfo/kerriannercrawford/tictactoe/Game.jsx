import React from 'react';
import Board from './Board.jsx';

export default class Game extends React.Component {
  render() {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
      </div>
    );
  }
}
