export abstract class IUnit {
  char: string;
  pos: {x, y};
  field: any[][];
  units;

  abstract next();
}