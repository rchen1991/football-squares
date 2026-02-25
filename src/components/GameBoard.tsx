import GameSquare from './GameSquare';
import './GameBoard.css'

type GameBoardProps = {
    teamOneNumbers?: number[],
    teamTwoNumbers?: number[],
    isNumbersHidden?: boolean,
    isDisabled?: boolean,
    gameScores?: number[][],
}

export default function GameBoard({
    teamOneNumbers,
    teamTwoNumbers,
    isNumbersHidden,
    isDisabled,
    gameScores
}: GameBoardProps) {

    return (
        <div className="game-board">
            <div className="team-one-numbers">
                {!isNumbersHidden && teamOneNumbers?.map((hNum) => {
                    return (
                        <div className="team-one-number">{hNum}</div>
                    )
                })}
            </div>
            <div className="game-board-away-row">
                <div className="team-two-numbers">
                    {!isNumbersHidden && teamTwoNumbers?.map((aNum) => {
                        return (
                            <div className="team-two-number">{aNum}</div>
                        )
                    })}
                </div>
                <div className="game-board-grid">
                    {teamTwoNumbers?.map((teamTwoNum, index) => {
                        return (
                            <div className="game-board-row" key={`${index}+${teamTwoNum}`}>
                                {teamOneNumbers?.map((teamOneNum) => {
                                    let isWinner = false;

                                    gameScores?.forEach((score) => {
                                        if ((score[0] % 10) === teamOneNum && (score[1] % 10) === teamTwoNum) {
                                            isWinner = true;
                                            console.log('found a score match', score);
                                        }
                                    });

                                    return (
                                        <GameSquare
                                            isDisabled={isDisabled}
                                            isWinner={isWinner}
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