export class User {
  constructor(username, email, password, savedTeam) {
    this.username = username || null;
    this.email = email || null;
    this.password = password || null;
    this.savedTeams = savedTeams || [];
  }
}