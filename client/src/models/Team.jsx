export class Team {
  constructor(id,conference, division, city, name, full_name, abbreviation){
    this.id=id;
    this.conference =conference;
    this.division= division;
    this.city =city;
    this.name=name;
    this.full_name=full_name;
    this.abbreviation=abbreviation; 

  };
}


export class User {
  constructor(username, email, password, savedTeams= []) {
    this.username = username || null;
    this.email = email || null;
    this.password = password || null;
    this.savedTeams = savedTeams;
  }
}