export const getSavedTeamNames = () => {
  const savedTeamNames = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedTeamNames;
};

export const saveTeamNames= (teamNameArr) => {
  if (teamNameArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(teamNameArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeTeamName = (name) => {
  const savedTeamNames = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedTeamNames) {
    return false;
  }

  const updatedSavedTeamNames = savedTeamNames?.filter((savedTeamName) => savedTeamName !== name);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedTeamNames));

  return true;
};
