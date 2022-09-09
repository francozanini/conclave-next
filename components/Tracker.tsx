import { Trackable, TrackerState } from '../interfaces';
import TrackerCell from './TrackerCell';

interface Props {
    trackable: Trackable;
    changeTrackable: (trackable: Trackable) => void;
}

export default function Tracker({ trackable, changeTrackable }: Props) {
    const changeTracker = (newState: TrackerState, i: number) =>
        changeTrackable({
            name: trackable.name,
            track: trackable.track.map((state, j) => (j === i ? newState : state))
        });

    return (
        <div style={{ display: 'flex' }}>
            <h3>{trackable.name}</h3>
            {trackable.track.map((track, index) => {
                return (
                    <TrackerCell
                        key={index}
                        i={index}
                        state={track}
                        changeKindred={changeTracker}
                    />
                );
            })}
        </div>
    );
}
