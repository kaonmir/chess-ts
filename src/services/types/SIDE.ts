const SIDE = {
  WHITE: 0,
  BLACK: 1,
  EMPTY: 2,
} as const;

type SIDE = typeof SIDE[keyof typeof SIDE];

export default SIDE;
