export class Hero {
  public id: String = "";
  public name: String = "";
  public description?: String = "";
  public imageUrl?: String = "";
  constructor(id: String, name: String, description?: string, imageUrl?: string) {
    this.id = id;
    this.name = name;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
