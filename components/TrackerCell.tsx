import { TrackerState } from '../interfaces';

interface Props {
    state: TrackerState;
    changeKindred: (newState: TrackerState, i: number) => void;
    i: number;
}

export default function TrackerCell({ state, changeKindred, i }: Props) {
    const symbol = state === 'aggravated' ? 'X' : state === 'superficial' ? '/' : '';

    return (
        <div
            style={{
                margin: '1px',
                border: '1px solid black',
                width: '20px',
                height: '20px',
                fontSize: '18px',
                textAlign: 'center'
            }}
            onClick={() => changeKindred(nextTrackerState(state), i)}>
            {symbol}
        </div>
    );
}

const nextTrackerState = (state: TrackerState) => {
    const stateMappings = new Map<TrackerState, TrackerState>([
        ['empty', 'superficial'],
        ['superficial', 'aggravated'],
        ['aggravated', 'empty']
    ]);

    return stateMappings.get(state);
};
