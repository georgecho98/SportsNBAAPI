export const getSavedTeamNames = () => {
  const savedTeamNames = localStorage.getItem('saved_teams')
    ? JSON.parse(localStorage.getItem('saved_teams'))
    : [];

  return savedTeamNames;
};

export const saveTeamNames= (teamNameArr) => {
  if (teamNameArr.length) {
    localStorage.setItem('saved_teams', JSON.stringify(teamNameArr));
  } else {
    localStorage.removeItem('saved_teams');
  }
};

export const removeTeamName = (name) => {
  const savedTeamNames = localStorage.getItem('saved_teams')
    ? JSON.parse(localStorage.getItem('saved_teams'))
    : null;

  if (!savedTeamNames) {
    return false;
  }

  const updatedSavedTeamNames = savedTeamNames?.filter((savedTeamName) => savedTeamName !== name);
  localStorage.setItem('saved_teams', JSON.stringify(updatedSavedTeamNames));

  return true;
};
