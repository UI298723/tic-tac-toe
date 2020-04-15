import React, { Component } from 'react';
import "./Board.css";


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends Component {
    renderSquare(i, bgcolor) {
      return (
          <Square 
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
              bgColor={bgcolor}
          />
      );
    }

    render() {
        const rowArr = [];
        let diagCounter = 0;

        for (var i = 0; i<this.props.boardSize; i++) {
            let boardRow = [];
            var j = 0;
            console.log(this.props.winIndex + ' ' + this.props.winState);

            switch (this.props.winState) {
                case 0: {
                    for (j = 0; j<this.props.boardSize; j++) {
                        if (i*this.props.boardSize+j >= this.props.winIndex && (i*this.props.boardSize+j < this.props.winIndex + this.props.winSize)) {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#00e673"));
                        } else {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#ffffff"));
                        }
                    }
                    break;
                }
                case 1: {
                    for (j = 0; j<this.props.boardSize; j++) {
                        if (((i*this.props.boardSize+j)%this.props.boardSize === this.props.winIndex%this.props.boardSize ) &&
                            (i*this.props.boardSize+j >= this.props.winIndex) &&
                            (i*this.props.boardSize+j <= this.props.winIndex + (this.props.boardSize - 1) * this.props.winSize)) {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#00e673"));
                        } else {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#ffffff"));
                        }
                    }
                    break;
                }
                case 2: {
                    for (j = 0; j<this.props.boardSize; j++) {
                        if ((i*this.props.boardSize+j === (this.props.winIndex + this.props.boardSize*diagCounter + diagCounter)) &&
                            (i*this.props.boardSize+j >= this.props.winIndex) &&
                            (i*this.props.boardSize+j <= this.props.winIndex + (this.props.boardSize - 1) * this.props.winSize)) {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#00e673"));
                            diagCounter++;
                        } else {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#ffffff"));
                        }
                    }
                    break;
                }
                case 3: {
                    for (j = 0; j<this.props.boardSize; j++) {
                        if ((i*this.props.boardSize+j === (this.props.winIndex + this.props.boardSize*diagCounter - diagCounter)) &&
                            (i*this.props.boardSize+j >= this.props.winIndex) &&
                            (i*this.props.boardSize+j < this.props.winIndex + (this.props.boardSize - 1) * this.props.winSize)) {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#00e673"));
                            diagCounter++;
                        } else {
                            boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#ffffff"));
                        }
                    }
                    break;
                }
                default: {
                    for (j = 0; j<this.props.boardSize; j++) {
                        boardRow.push(this.renderSquare(i*this.props.boardSize+j, "#ffffff"));
                    }
                }
            }

            rowArr.push(<div className="board-row">{boardRow}</div>)
        }

        return (
            <div>
                {rowArr}
            </div>
        );
    }
}

export default Board;