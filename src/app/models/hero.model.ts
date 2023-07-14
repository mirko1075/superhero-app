export class Hero {
  public _id = "";
  public name = "";
  public description?: string = "";
  public imageUrl?: string = "";
  constructor(id: string, name: string, description?: string, imageUrl?: string) {
    this._id = id;
    this.name = name;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
