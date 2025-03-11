export default class User {
  constructor(username, email, password, savedTeams) {
    this.username = username || null;
    this.email = email || null;
    this.password = password || null;
    this.savedTeams = savedTeams || [];
  }
}