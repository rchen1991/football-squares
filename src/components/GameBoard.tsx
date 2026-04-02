import GameSquare from './GameSquare';
import './GameBoard.css'

type GameBoardProps = {
    teamOneNumbers?: number[],
    teamTwoNumbers?: number[],
    isNumbersHidden?: boolean,
    isDisabled?: boolean,
    gameScores?: number[][],
    nameMap: Record<string, string>,
    handleNameMapChange: (square: string, name: string) => void,
}

const GRID_SIZE = 10;

export default function GameBoard({
    teamOneNumbers,
    teamTwoNumbers,
    isNumbersHidden,
    isDisabled,
    gameScores,
    nameMap,
    handleNameMapChange
}: GameBoardProps) {
    return (
        <div className="game-board">
            <div className="team-one-numbers">
                {!isNumbersHidden && teamOneNumbers?.map((hNum) => {
                    return (
                        <div className="team-one-number" key={`${hNum}`}>{hNum}</div>
                    )
                })}
            </div>
            <div className="game-board-away-row">
                <div className="team-two-numbers">
                    {!isNumbersHidden && teamTwoNumbers?.map((aNum) => {
                        return (
                            <div className="team-two-number" key={`${aNum}`}>{aNum}</div>
                        )
                    })}
                </div>
                <div className="game-board-grid">
                    {Array.from({length: GRID_SIZE}, (_, rowIndex) => {
                        const teamTwoNum = teamTwoNumbers?.[rowIndex];
                        return (
                            <div className="game-board-row" key={`${rowIndex}+${teamTwoNum}`}>
                                {Array.from({length: GRID_SIZE}, (_, colIndex) => {
                                    const teamOneNum = teamOneNumbers?.[colIndex];
                                    let isWinner = false;

                                    gameScores?.forEach((score) => {
                                        if ((score[0] % 10) === teamOneNum && (score[1] % 10) === teamTwoNum) {
                                            isWinner = true;
                                        }
                                    });

                                    return (
                                        <GameSquare
                                            key={`${rowIndex}-${colIndex}`}
                                            isDisabled={isDisabled}
                                            isWinner={isWinner}
                                            row={rowIndex}
                                            col={colIndex}
                                            nameMap={nameMap}
                                            handleNameMapChange={(name) => handleNameMapChange(`${rowIndex}-${colIndex}`, name)}
                                        />
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )

}