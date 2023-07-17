export class Hero {
  public _id?: string | undefined;
  public name: string;
  public description?: string;
  public imageName?: string;
  public powerstats?: PowerStats;

  constructor(
    name: string,
    description?: string,
    imageName?: string,
    powerstats?: PowerStats
  ) {
    this.name = name;
    this.name = name;
    this.description = description;
    this.imageName = imageName;
    this.powerstats = powerstats;
  }
}

export interface PowerStats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}
