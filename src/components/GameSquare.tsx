import { useState } from 'react'

import './GameSquare.css'

type GameSquareProps = {
    isDisabled?: boolean,
    isWinner?: boolean,
}

export default function GameSquare({
    isDisabled,
    isWinner,
}: GameSquareProps) {
    const [squareValue, setSquareValue] = useState('');
    if (isWinner) {
        setSquareValue('WINNER!');
    }

    return (
            <input 
                className="game-square-input"
                name="game-square-input"
                value={squareValue}
                onChange={(e) => setSquareValue(e.target.value)}
                disabled={isDisabled}
            />
    )
}