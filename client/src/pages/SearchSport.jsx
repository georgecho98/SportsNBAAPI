import { useState, useEffect } from 'react';
// import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveTeam,searchTeam } from '../utils/API';
import { saveTeamNames, getSavedTeamNames } from '../utils/localStorage';


const SearchSport = () => {

  const [searchedTeams, setSearchedTeams] = useState('');

  const [searchInput, setSearchInput] = useState('');


  const [savedTeamNames, setSavedTeamNames] = useState(getSavedTeamNames());


  useEffect(() => {
    return () => saveTeamNames(savedTeamNames);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchTeam(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const teamData = items.map((team) => ({
        id: team.id,
        conference: team.conference ,
        division: team.division,
        city: team.city,
        name: team.name || ['No team to display'],
        full_name: team.full_name || '',
        abbreviation: team.abbreviation || '',

      }));

      setSearchedTeams(teamData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a team to our database
  const handleSaveTeam = async (full_name) => {
    
    const teamToSave = searchedTeams.find(() => team.full_name === full_name);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveTeam(teamToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedTeamNames([...savedTeamNames, teamToSave.full_name]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Teams!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Team'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedTeams.length
            ? `Viewing ${searchedTeams.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedTeams.map((team) => {
            return (
              <Col md="4" key={team.full_name}>
                <Card border='dark'>
                  {team ? (
                    <Card.Img src={"..\..\Image\x01.jpg"} alt={`Not available`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{team.full_name}</Card.Title>
                    <p className='small'>conference: {team.conference}</p>
                    <p className='small'>city {team.city}</p>
                    <p className='small'>division: {team.division}</p>
                    <p className='small'>Abbreviation: {team.abbreviation}</p>

                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedTeamNames?.some((savedTeamName) => savedTeamName === team.full_name)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveTeam(team.full_name)}>
                        {savedTeamNames?.some((savedTeamName) => savedTeamName === team.full_name)
                          ? 'This team has already been saved!'
                          : 'Save this team!'}
                      </Button>
                    )}
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

export default SearchSport;
