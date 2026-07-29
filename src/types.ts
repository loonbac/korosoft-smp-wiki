export interface MobDrop {
  item: string;
  qty: string;
  prob: string;
  url?: string;
}

export interface Mob {
  id?: string;
  name: string;
  danger: number;
  hpMin: number;
  hpMax: number;
  hpMod: number;
  dmgMin: number;
  dmgMax: number;
  dmgMod: number;
  armorMin: number;
  armorMax: number;
  armorMod: number;
  toughMin: number;
  toughMax: number;
  toughMod: number;
  speed: number;
  desc: string;
  spawn: string;
  f3Biomes?: string[];
  spawnConditions?: string[];
  mechanic: string;
  drops: MobDrop[];
}

export interface BossPhase {
  phase: number;
  title: string;
  skills: string[];
}

export interface Boss {
  id: string;
  name: string;
  title: string;
  badge: string;
  hp: string;
  dmg: string;
  armor: string;
  speed: string;
  location: string;
  spawnConditions: string;
  desc: string;
  phases: BossPhase[];
  tips: string[];
  drops: MobDrop[];
}

export interface ArmorPiece {
  name: string;
  def: string;
  stats: string;
}

export interface ArmorSet {
  id: string;
  tier: string;
  name: string;
  color: string;
  desc: string;
  totalDef: string;
  totalHp: string;
  totalStamina: string;
  totalToughness?: string;
  specialization?: string;
  setBonus?: {
    twoPieces?: string;
    fourPieces?: string;
  };
  pieces: ArmorPiece[];
}

export interface AccessoryPiece {
  name: string;
  rarity: string;
  stars: string;
  starIcon: string;
  color: string;
  stats: string[];
  source: string;
  desc: string;
}

export interface AccessorySet {
  id: string;
  name: string;
  type: string;
  color: string;
  desc: string;
  summary: {
    pveDmg: string;
    atkDmg: string;
    armor: string;
    toughness: string;
    extraHp: string;
    critChance: string;
  };
  bonuses: {
    pieces2: string;
    pieces4: string;
    pieces6: string;
  };
  pieces: AccessoryPiece[];
}

export interface RecipeIngredient {
  name: string;
  qty: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  station: string;
  time: string;
  hungerRestored: string;
  effects: string[];
  ingredients: RecipeIngredient[];
}

export interface Mineral {
  id: string;
  name: string;
  layer: string;
  pickaxe: string;
  rarity: string;
  uses: string[];
  drops: string;
}

export interface CraftingStation {
  id: string;
  name: string;
  recipe: string;
  use: string;
  category: string;
}

export interface CommandInfo {
  command: string;
  permission?: string;
  desc: string;
  example: string;
}

export interface CommandCategory {
  category: string;
  commands: CommandInfo[];
}

export interface ServerUpdate {
  date: string;
  version: string;
  title: string;
  changes: string[];
}
