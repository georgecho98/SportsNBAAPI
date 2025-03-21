import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { getMe, deleteTeam } from '../utils/API';
import Auth from '../utils/auth';
import { removeTeamName } from '../utils/localStorage';


const SavedScoreResult = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    savedTeams: [],
  
  });

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  const handleDeleteTeam = async (name) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteTeam(name);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove team name from localStorage
      removeTeamName(name);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved teams!</h1>
          ) : (
            <h1>Viewing saved Tems!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedTeams.length
            ? `Viewing ${userData.savedTeams.length} saved ${
                userData.savedTeams.length === 1 ? 'team' : 'teams'
              }:`
            : 'You have no saved teams!'}
        </h2>
        <Row>
          {userData.savedTeams.map((team) => {
            return (
              <Col md='4'>
                <Card key={team.name} border='dark'>
                  
                  <Card.Body>
                        <Card.Title>{team.full_name}</Card.Title>
                        <p className='small'>conference: {team.conference}</p>
                        <p className='small'>name: {team.name}</p>
                        <p className='small'>city {team.city}</p>
                        <p className='small'>division: {team.division}</p>
                        <p className='small'>Abbreviation: {team.abbreviation}</p>
                    
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteTeam(team.name)}
                    >
                      Delete this Team!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedScoreResult;
