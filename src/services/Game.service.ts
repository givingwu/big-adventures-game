/**
 * CellType
 *  - start 起点单元格
 *  - normal 普通单元格，啥都没有
 *  - special 特殊单元格，比如有特殊奖品，或者特殊逻辑
 *  - empty 空单元格
 *  - end 终点单元格
 */
// @ts-expect-error 忽略枚举类型定义错误
export enum CellType {
  Start = 'start',
  Normal = 'normal',
  Special = 'special',
  Empty = 'empty',
  End = 'end',
}

/**
 * 游戏单元格位置: (x, y) 坐标
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 逻辑单元格 数据结构
 */
export interface Cell {
  /**
   * 步骤顺序：
   *  - 0 即为不渲染的 empty 空单元格
   *  - integer 即为是有效步骤的单元格
   */
  order: number;
  /**
   * 单元格类型
   *  - start 起点单元格
   *  - normal 普通单元格，啥都没有
   *  - special 特殊单元格，比如有特殊奖品，或者特殊逻辑
   *  - empty 空单元格
   *  - end 终点单元格
   */
  type: CellType;
  /**
   * 奖品的数据结构
   */
  reward: string;
  /**
   * 即当前单元格的 x,y 行列坐标
   */
  position: Position;
}

export const COL_COUNT = 8;
export const ROW_COUNT = 7;

/**
 * 获取奖励内容
 */
const getReward = (type: CellType): string => {
  if (type === CellType.Empty) return '';

  if (type === CellType.Special) {
    return '🍎';
  }

  return '🍦';
};

/**
 * 游戏服务
 */
export const GameService = {
  /**
   * 获取游戏单元格列表
   */
  getCellsList: (): Cell[] => {
    let order = 0;

    /** 第一行：从左到右 (1-8) */
    const firstRow = []
    /** 第二行：从右到左 (9) */
    const secondRow = []
    /** 第三行：从右到左 (10-17) */
    const thirdRow = []
    /** 第四行：从左到右 (18) */
    const fourthRow = []
    /** 第五行：从左到右 (19-26) */
    const fifthRow = []
    /** 第六行：从左到右 (27) */
    const sixthRow = []
    /** 第七行：从右到左 (28-35) */
    const seventhRow = []

    // 第一行：从左到右 (1-8)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i === 0 ? CellType.Start : i % 2 === 0 ? CellType.Normal : CellType.Special;

      firstRow.push({
        order: order += 1,
        type,
        reward: getReward(type),
        position: { x: i, y: 0 }
      });
    }

    // 第二行：从右到左 (9)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i === COL_COUNT - 1 ? CellType.Normal : CellType.Empty;

      secondRow.push({
        order: type !== CellType.Empty ? order += 1 : 0,
        type,
        reward: getReward(type),
        position: { x: i, y: 1 }
      });
    }

    // 第三行：从右到左 (17-10)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i % 2 === 0 ? CellType.Special : CellType.Normal;

      thirdRow.push({
        order: order += 1,
        type,
        reward: getReward(type),
        position: { x: i, y: 2 }
      });
    }

    // 第四行：从左到右 (18)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i === 0 ? CellType.Special : CellType.Empty;

      fourthRow.push({
        order: type !== CellType.Empty ? order += 1 : 0,
        type,
        reward: getReward(type),
        position: { x: 7 - i, y: 3 }
      });
    }

    // 第五行：从左到右 (19-26)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i % 2 === 0 ? CellType.Normal : CellType.Special;

      fifthRow.push({
        order: order += 1,
        type,
        reward: getReward(type),
        position: { x: i, y: 4 }
      });
    }

    // 第六行：从左到右 (27)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i === COL_COUNT - 1 ? CellType.Normal : CellType.Empty;

      sixthRow.push({
        order: type !== CellType.Empty ? order += 1 : 0,
        type,
        reward: getReward(type),
        position: { x: i, y: 5 }
      });
    }

    // 第七行：从右到左 (35-28)
    for (let i = 0; i < COL_COUNT; i++) {
      const type: CellType = i % 2 === 0 ? CellType.Special : CellType.Normal;

      seventhRow.push({
        order: order += 1,
        type,
        reward: getReward(type),
        position: { x: 7 - i, y: 6 }
      });
    }

    return [
      ...firstRow,
      ...secondRow,
      ...thirdRow.reverse(),
      ...fourthRow,
      ...fifthRow,
      ...sixthRow,
      ...seventhRow.reverse()
    ];
  },

  /**
   * 获取骰子点数
   */
  rollDice: (): number => {
    return Math.floor(Math.random() * 6) + 1;
  },

  /**
   * 根据顺序获取单元格
   */
  getCellByOrder: (cells: Cell[], order: number): Cell | undefined => {
    return cells.find(cell => cell.order === order);
  },

  /**
   * 获取下一个单元格
   */
  getNextCell: (cells: Cell[], currentOrder: number, step: number): Cell | undefined => {
    const targetOrder = currentOrder + step;
    return cells.find(cell => cell.order === targetOrder);
  }
};

export default GameService;