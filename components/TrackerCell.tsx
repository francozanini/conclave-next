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
            className={'m-1 border-2 border-solid border-white h-8 w-8 text-center'}
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
