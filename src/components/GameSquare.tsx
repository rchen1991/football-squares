import './GameSquare.css'

type GameSquareProps = {
    isDisabled?: boolean,
    isWinner?: boolean,
    teamOneNum?: number,
    teamTwoNum?: number,
    nameMap: Record<string, string>,
    handleNameMapChange: (name: string) => void,
}

export default function GameSquare({
    isDisabled,
    isWinner,
    teamOneNum,
    teamTwoNum,
    nameMap,
    handleNameMapChange
}: GameSquareProps) {

    return (
            <input 
                className={`game-square-input ${isWinner ? 'winner' : ''}`}
                name="game-square-input"
                disabled={isDisabled}
                value={nameMap[`${teamOneNum}-${teamTwoNum}`] || ''}
                onChange={(e) => handleNameMapChange(e.target.value)}
            />
    )
}