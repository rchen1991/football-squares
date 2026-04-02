import './GameSquare.css'

type GameSquareProps = {
    isDisabled?: boolean,
    isWinner?: boolean,
    row?: number,
    col?: number,
    nameMap: Record<string, string>,
    handleNameMapChange: (name: string) => void,
}

export default function GameSquare({
    isDisabled,
    isWinner,
    row,
    col,
    nameMap,
    handleNameMapChange
}: GameSquareProps) {

    return (
            <input 
                className={`game-square-input ${isWinner ? 'winner' : ''}`}
                name="game-square-input"
                disabled={isDisabled}
                value={nameMap[`${row}-${col}`] || ''}
                onChange={(e) => handleNameMapChange(e.target.value)}
            />
    )
}