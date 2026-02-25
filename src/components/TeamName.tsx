import './TeamName.css'

type TeamNameProps = {
    name?: string,
    orientation?: 'horizontal' | 'vertical',
}

export default function TeamName({
    name,
    orientation = 'vertical',
}: TeamNameProps) {

    return (
        <div className={orientation === 'vertical' ? 'team-name-vertical' : 'team-name-horizontal'}>
            {name}
        </div>
    )
}
