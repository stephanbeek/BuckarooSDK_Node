import Model from "./Model";

export default interface IPerson {
  category?: string
  gender?: string
  culture?: string
  careOf?: string
  title?: string
  initials?: string
  name?: string
  firstName?: string
  lastNamePrefix?: string
  lastName?: string
  birthDate?: string
  placeOfBirth?: string
}

export class Person extends Model implements IPerson {
  birthDate?: string;
  careOf?: string;
  category?: string;
  culture?: string;
  firstName?: string;
  gender?: string;
  initials?: string;
  lastName?: string;
  lastNamePrefix?: string;
  name?: string;
  placeOfBirth?: string;
  title?: string;

  constructor(data) {
    super();
    this.setParameters(data)
  }
}