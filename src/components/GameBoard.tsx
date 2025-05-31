import { memo, useEffect } from 'react';
import type { Cell } from '../services/Game.service';
import GameCell from './GameCell';

interface GameBoardProps {
  colCount: number;
  rowCount: number;
  cells: Cell[];
  currentOrder: number;
}

const GameBoard = memo(({ colCount, rowCount, cells, currentOrder }: GameBoardProps) => {
  useEffect(() => {
    const totalCellCount = colCount * rowCount;

    if (cells.length !== totalCellCount) {
      console.error(`cells length is not equal to colCount * rowCount = ${totalCellCount} !== ${cells.length}`);
    }
  }, [cells, colCount, rowCount]);

  return (
    <div className="relative container bg-blue-50 p-4 rounded-lg border-2 border-blue-200 shadow-lg">
      <div
        className="grid grid-cols-8 gap-2"
        style={{
          width: '100%',
          maxWidth: '800px',
          aspectRatio: '8/7'
        }}
      >
        {/* 渲染网格 */}
        {cells.map((cell) => {
          return (
            <GameCell
              key={`cell(${cell.position.x},${cell.position.y})`}
              {...cell}
              isCurrent={cell.order === currentOrder}
            />
          );
        })}
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;