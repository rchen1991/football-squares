import { useRef } from 'react';
import './GameControls.css'

type GameControlsProps = {
    handleRandomizeNumbers: () => void,
    handleRevealNumbers: () => void,
    handleTeamNameChange: (evt: React.ChangeEvent<HTMLInputElement>, setStateCallback: React.Dispatch<React.SetStateAction<string>>) => void,
    handleConfirm: () => void,
    handleScoreChange: (scores: number[]) => void,
    isDisabled: boolean,
    isNumbersHidden: boolean,
    setTeam1Name: React.Dispatch<React.SetStateAction<string>>,
    setTeam2Name: React.Dispatch<React.SetStateAction<string>>,
}

export function GameControls({
    handleRandomizeNumbers,
    handleRevealNumbers,
    handleTeamNameChange,
    handleConfirm,
    handleScoreChange,
    isDisabled,
    isNumbersHidden,
    setTeam1Name,
    setTeam2Name,
}: GameControlsProps) {
    const team1ScoreRef = useRef<HTMLInputElement | null>(null);
    const team2ScoreRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="game-controls">
          <div className="number-controls">
            <button
              disabled={isDisabled}
              onClick={handleRandomizeNumbers}
            >
              Randomize Numbers
            </button>
            <button
              disabled={isDisabled}
              onClick={handleRevealNumbers}
            >
              {isNumbersHidden ? 'Reveal' : 'Hide'} numbers
            </button>
          </div>
          <div className="team-name-controls">
            <p>Team 1 name:</p>
            <input name="team1Name" onChange={(e) => handleTeamNameChange(e, setTeam1Name)}/>
          </div>
          <div className="team-name-controls">
            <p>Team 2 name:</p>
            <input name="team2Name" onChange={(e) => handleTeamNameChange(e, setTeam2Name)}/>
          </div>
          <div>
            <button onClick={handleConfirm}>{isDisabled ? 'Edit' : 'Confirm'}</button>
          </div>
          <div className="score-controls">
            <div className="score-inputs">
              <p>Team 1 Score:</p>
              <input name="team1Score" type="number" placeholder="0"ref={team1ScoreRef}/>
              <p>Team 2 Score:</p>
              <input name="team2Score" type="number" placeholder="0" ref={team2ScoreRef}/>
            </div>
            <button onClick={() => handleScoreChange([team1ScoreRef.current?.valueAsNumber || 0, team2ScoreRef.current?.valueAsNumber || 0])}>Add Score</button>
          </div>

      </div>
    )
}