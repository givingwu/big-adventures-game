import { memo, useMemo } from 'react';
import GamePlayer from './GamePlayer';
import type { Cell } from '../services/Game.service';

interface GameCellProps extends Cell {
  isCurrent: boolean;
}

const GameCell = memo(({ type, order, reward, position, isCurrent }: GameCellProps) => {
  // 确定格子样式
  const cellClassName = useMemo(() => {
    if (type === 'empty' || order === 0) {
      return "opacity-0";
    }

    let className = "relative flex items-center justify-center rounded-lg border-2 h-full w-full";

    // 根据格子类型设置不同样式
    switch (type) {
      case 'start':
        className += " bg-green-200 border-green-400";
        break;
      case 'end':
        className += " bg-red-200 border-red-400";
        break;
      case 'special':
        className += " bg-purple-200 border-purple-400";
        break;
      default:
        className += " bg-yellow-100 border-yellow-300";
    }

    return className;
  }, [type, order]);

  // 空单元格或 order 为 0 的单元格只渲染基础样式
  if (type === 'empty' || order === 0) {
    return <div className={cellClassName} />;
  }

  return (
    <div
      className={cellClassName}
      data-order={order}
      data-position={`${position.x},${position.y}`}
    >
      {/* 顺序编号 */}
      <div className="absolute top-1 left-1 text-xs font-bold">
        {order}
      </div>

      {/* 奖励图标 */}
      <div className="text-xs">
        {reward}
      </div>

      {/* 玩家位置标记 */}
      {isCurrent && (
        <GamePlayer />
      )}
    </div>
  );
});

GameCell.displayName = 'GameCell';

export default GameCell;