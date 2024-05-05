import React from 'react';
import {
  Match,
  SingleEliminationBracket
} from '@g-loot/react-tournament-brackets';

function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


function generateMatches(teams) {
  const matches = [];
  let matchId = 0;

  // Generate matches for the first round
  for (let i = 0; i < teams.length; i += 2) {
    const match = {
      id: matchId++,
      nextMatchId: matchId,
      tournamentRoundText: "1",
      startTime: "2021-05-30",
      state: "SCHEDULED",
      participants: [
        {
          id: teams[i].id,
          resultText: null,
          isWinner: false,
          status: null,
          name: teams[i].name,
          picture: teams[i].picture
        },
        {
          id: teams[i + 1].id,
          resultText: null,
          isWinner: false,
          status: null,
          name: teams[i + 1].name,
          picture: teams[i + 1].picture
        }
      ]
    };
    matches.push(match);
  }

  // Generate matches for subsequent rounds
  let roundNumber = 2;
  let remainingMatcheArr = JSON.parse(JSON.stringify(matches));

  while (remainingMatcheArr.length > 1) {
    const roundMatches = [];
    for (let i = 0; i < remainingMatcheArr.length; i += 2) {
      const match = {
        id: matchId++,
        nextMatchId: i + 2 < remainingMatcheArr.length ? matchId : null,
        tournamentRoundText: (roundNumber).toString(),
        startTime: "2021-05-30",
        state: "SCHEDULED",
        participants: []
      };
      roundMatches.push(match);
    }
    matches.push(...roundMatches);
    remainingMatcheArr = JSON.parse(JSON.stringify(roundMatches));
    roundNumber++;
  }

  // Add semi-finals and final if needed
  const numberOfExtraMatches = teams.length === 8 ? 3 : teams.length === 16 ? 7 : 0;
  if (numberOfExtraMatches > 0) {
    let start = matches.length - numberOfExtraMatches * 2;
    for (let i = 0; i < numberOfExtraMatches; i += 2) {
      const semiFinalMatch = {
        id: matchId++,
        nextMatchId: i + 2 < numberOfExtraMatches ? matchId : null,
        tournamentRoundText: "SF",
        startTime: "2021-05-30",
        state: "SCHEDULED",
        participants: [
          {
            id: matches[start + i].id,
            resultText: null,
            isWinner: false,
            status: null,
            name: matches[start + i].participants[0].name,
            picture: matches[start + i].participants[0].picture
          },
          {
            id: matches[start + i + 1].id,
            resultText: null,
            isWinner: false,
            status: null,
            name: matches[start + i + 1].participants[0].name,
            picture: matches[start + i + 1].participants[0].picture
          }
        ]
      };
      matches.push(semiFinalMatch);

      if (i === numberOfExtraMatches - 2) {
        const finalMatch = {
          id: matchId++,
          nextMatchId: null,
          tournamentRoundText: "Final",
          startTime: "2021-05-30",
          state: "SCHEDULED",
          participants: [
            {
              id: semiFinalMatch.id,
              resultText: null,
              isWinner: false,
              status: null,
              name: semiFinalMatch.participants[0].name,
              picture: semiFinalMatch.participants[0].picture
            },
            {
              id: semiFinalMatch.nextMatchId,
              resultText: null,
              isWinner: false,
              status: null,
              name: semiFinalMatch.participants[1].name,
              picture: semiFinalMatch.participants[1].picture
            }
          ]
        };
        matches.push(finalMatch);
      }
    }
  }
  console.log(matches)
  return matches;
}


function EventPage() {
  const Teams = [
    {
      "id": "0",
      "name": "CSK",
      "picture": "https://picsum.photos/200/300"
    },
    {
      "id": "1",
      "name": "RR",
      "picture": "https://picsum.photos/200/300"
    },
    {
      "id": "2",
      "name": "RCB",
      "picture": "https://picsum.photos/200/300"
    },
    {
      "id": "3",
      "name": "SRC",
      "picture": "https://picsum.photos/200/300"
    }
  ]
  
  

  return (
    <div>
      {/* Page Content */}
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <div className='row' >
              <div className="col-md-3 leftSideInfo" >
                <img src="http://placehold.it/300x300" alt="" />
              </div>
              <div className="col-md-9 rightSideInfo" >
                <div>
                  <b className='fs-3' >Champions Tour 2024: China Stage 1</b>
                  <p className='fs-6' > Part of the Valorant Champions Tour, Riot's official 2024 tournament circuit </p>
                </div>
                <div className='infos' >
                  <div className='info ' >
                    <div className='label' >Date</div>
                    <div className='value' >Apr 5, 2024 - May 13, 2024</div>
                  </div>
                  <div className='info ' >
                    <div className='label' >PRIZE POOL</div>
                    <div className='value' >TBD</div>
                  </div>
                  <div className='info ' >
                    <div className='label' >LOCATION</div>
                    <div className='value' >India</div>
                  </div>
                </div>

              </div>

            </div>
          </div>
          <div className="col-md-12">
            <div className="card my-4">
              <h5 className="card-header">BRACKET</h5>
              <div className="card-body">
                <SingleEliminationBracket
                  matchComponent={Match}
                  onMatchClick={(any)=>{
                    console.log(any)   
                  }}
                  matches={generateMatches(Teams)}
                  theme={{
                    border: {
                      color: '#22293B',
                      highlightedColor: '#707582'
                    },
                    canvasBackground: '#0B0D13',
                    disabledColor: '#5D6371',
                    fontFamily: 'monospace',
                    matchBackground: {
                      lostColor: '#141822',
                      wonColor: '#1D2232'
                    },
                    roundHeaders: {
                      background: '#2F3648'
                    },
                    score: {
                      background: {
                        lostColor: '#10131C',
                        wonColor: '#10131C'
                      },
                      text: {
                        highlightedLostColor: '#FF9505',
                        highlightedWonColor: '#118ADE'
                      }
                    },
                    textColor: {
                      dark: '#707582',
                      disabled: '#5D6371',
                      highlighted: '#E9EAEC',
                      main: '#BEC0C6'
                    },
                    transitionTimingFunction: 'cubic-bezier(0, 0.92, 0.77, 0.99)'
                  }}
                
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Footer Text</p>
        </div>
      </footer> */}
    </div>
  );
}

export default EventPage;
