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
      console.log(response)

      // if (!response.ok) {
      //   throw new Error(`something went wrong!:${response.status}`);
      // }

      // const { items } = await response.json();
   
      if (!response) {
        console.error('No items found in the response');
        return;
      }
      // .map((team) => ({
      //   id: team.id,
      //   conference: team.conference ,
      //   division: team.division,
      //   city: team.city,
      //   name: team.name || ['No team to display'],
      //   full_name: team.full_name || '',
      //   abbreviation: team.abbreviation || '',

      // }));
    
      setSearchedTeams(response);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a team to our database
  const handleSaveTeam = async (name) => {
    
    const teamToSave = searchedTeams
    // const teamToSave = searchedTeams.find(() => team.name === name);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveTeam(teamToSave, token);

      if (!response || (response.ok !== undefined && !response.ok)) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedTeamNames([...savedTeamNames, teamToSave.name]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-blue p-5">
        <Container>
          <h1>Search for Your NBA!</h1>
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
                <Button type='submit' variant='success' size='small'>
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
            : 'Search for a team to begin'}
        </h2>
        <Row>
          {/* {searchedTeams.localeCompare((team)=>{ */}
            {/* return ( */}
              <Col md="4" key={searchedTeams.name}>
                <Card border='dark'>
                  {searchedTeams ? (
                    <Card.Img src={"/Image/x01.jpg"} alt={`Not available`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{searchedTeams.full_name}</Card.Title>
                    <p className='small'>id: {searchedTeams.id}</p>
                    <p className='small'>conference: {searchedTeams.conference}</p>
                    <p className='small'>city {searchedTeams.city}</p>
                    <p className='small'>division: {searchedTeams.division}</p>
                    <p className='small'>name: {searchedTeams.name}</p>
                    <p className='small'>Abbreviation: {searchedTeams.abbreviation}</p>

                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedTeamNames?.some((savedTeamName) => savedTeamName === searchedTeams.name)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveTeam(searchedTeams.name)}>
                        {savedTeamNames?.some((savedTeamName) => savedTeamName === searchedTeams.name)
                          ? 'This team has already been saved!'
                          : 'Save this team!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            {/* );
          })} */}
        </Row>
      </Container>
    </>
  );
};

export default SearchSport;
