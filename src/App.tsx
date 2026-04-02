import { useState, useEffect, type ChangeEvent, type SetStateAction } from 'react';
import TeamName from './components/TeamName';
import GameBoard from './components/GameBoard';
import { GameControls } from './GameControls';

import { shuffleArray } from './utils/helpers';

import './App.css'

const NUMBERS = [0,1,2,3,4,5,6,7,8,9];
function App() {
  const [team1Name, setTeam1Name] = useState('Team 1')
  const [team2Name, setTeam2Name] = useState('Team 2')
  const [teamOneNumbers, setTeamOneNumbers] = useState(Array.from(NUMBERS));
  const [teamTwoNumbers, setTeamTwoNumbers] = useState(Array.from(NUMBERS));
  const [isNumbersHidden, setIsNumbersHidden] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameScores, setGameScores] = useState<number[][]>([]);
  const [nameMap, setNameMap] = useState<{[key: string]: string}>(() => {
    const saved = sessionStorage.getItem('nameMap');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return {};
    }
  });

  useEffect(() => { 
    sessionStorage.setItem('nameMap', JSON.stringify(nameMap));
  }, [nameMap]);

  const handleTeamNameChange = (evt: ChangeEvent<HTMLInputElement>, setStateCallback: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: string): void; }) => {
    setStateCallback(evt.target.value);
  }

  const handleRevealNumbers = () => {
    setIsNumbersHidden(!isNumbersHidden);
  }

  const handleRandomizeNumbers = () => {
    const homeShuffled = shuffleArray([...teamOneNumbers]);
    const awayShuffled = shuffleArray([...teamTwoNumbers])

    setTeamOneNumbers(homeShuffled);
    setTeamTwoNumbers(awayShuffled);
  }

  const handleConfirm = () => {
    setIsDisabled(!isDisabled);
  }

  const handleScoreChange = (score: number[]) => {
    if (gameScores.length >= 10) {
      return;
    }
    const newScores = [...gameScores];
    newScores.push(score);
    setGameScores(newScores);
  }

  const handleRemoveScore = (index: number) => {
    const newScores = [...gameScores];
    newScores.splice(index, 1);
    setGameScores(newScores);
  }

  const handleNameMapChange = (square: string, name: string) => {
    setNameMap((prev) => ({
      ...prev,
      [square]: name,
    }));
  }

  const resetGame = () => {
    setTeamOneNumbers(Array.from(NUMBERS));
    setTeamTwoNumbers(Array.from(NUMBERS));
    setIsNumbersHidden(false);
    setIsDisabled(false);
    setGameScores([]);
    setNameMap({});
  }

  return (
    <div className="game-app">
      <div className="left-side">
        <div className="game-grid">
          <div className="game-row-1">
            <TeamName name={team1Name || 'Team 1'} orientation='horizontal'/>
          </div>
          <div className="game-row-2">
            <TeamName name={team2Name || 'Team 2'} orientation='vertical'/>
            <GameBoard
              teamOneNumbers={teamOneNumbers}
              teamTwoNumbers={teamTwoNumbers}
              isNumbersHidden={isNumbersHidden}
              isDisabled={isDisabled}
              gameScores={gameScores}
              nameMap={nameMap}
              handleNameMapChange={handleNameMapChange}
            />
          </div>
        </div>
        <button className="reset-game" onClick={resetGame}>Reset Game</button>
      </div>
      <div className="right-side">
        <GameControls
          handleRandomizeNumbers={handleRandomizeNumbers}
          handleRevealNumbers={handleRevealNumbers}
          handleTeamNameChange={handleTeamNameChange}
          handleConfirm={handleConfirm}
          handleScoreChange={handleScoreChange}
          isDisabled={isDisabled}
          isNumbersHidden={isNumbersHidden}
          setTeam1Name={setTeam1Name}
          setTeam2Name={setTeam2Name}
        />
        <div className="scoreboard">
          {gameScores.map((number, index) => {
            const ordinal = ["st", "nd", "rd", "th"];
            const teamOneIndex = teamOneNumbers?.indexOf(number[0] % 10) ?? -1;
            const teamTwoIndex = teamTwoNumbers?.indexOf(number[1] % 10) ?? -1;
            return (
              <div key={`${number}+${index}`}>
                <div>
                  {`${index + 1}${ordinal[index] ?? "th"}`}: home - {number[0]}, away -{" "}{number[1]}
                  <button className="remove-score" onClick={() => handleRemoveScore(index)}>
                    Remove
                  </button>
                </div>
                <div>
                  Winner: {nameMap[`${teamTwoIndex}-${teamOneIndex}`] || "N/A"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default App
