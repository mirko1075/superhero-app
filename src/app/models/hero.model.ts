export class Hero {
  public _id: string;
  public name: string;
  public description?: string;
  public imageUrl?: string;
  public powerstats?: PowerStats;

  constructor(id: string, name: string, description?: string, imageUrl?: string, powerstats? :PowerStats ) {
    this._id = id;
    this.name = name;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.powerstats = powerstats;
  }
}

export interface PowerStats{
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}
