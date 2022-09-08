import Link from 'next/link';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { string } from 'prop-types';

type TrackerState = 'empty' | 'superficial' | 'aggravated';

interface Point {
    index: number;
    state: TrackerState;
}

type TrackableName = 'humanity' | 'hunger' | 'health' | 'willpower';

interface Trackable {
    name: TrackableName;
    track: TrackerState[];
}

interface Kindred {
    name: string;
    trackable: Trackable[];
}

const dummyData: Kindred[] = [
    {
        name: 'Boris',
        trackable: [
            { name: 'humanity', track: ['empty', 'empty', 'empty', 'empty', 'empty'] },
            { name: 'hunger', track: ['empty', 'empty', 'empty', 'empty', 'empty'] },
            { name: 'health', track: ['empty', 'empty', 'empty', 'empty', 'empty'] },
            { name: 'willpower', track: ['empty', 'empty', 'empty', 'empty', 'empty'] }
        ]
    }
];

const nextTrackerState = (state: TrackerState) => {
    const stateMappings = new Map<TrackerState, TrackerState>([
        ['empty', 'superficial'],
        ['superficial', 'aggravated'],
        ['aggravated', 'empty']
    ]);

    return stateMappings.get(state);
};

function TrackerCell({
    state,
    changeKindred,
    i
}: {
    state: TrackerState;
    changeKindred: (newState: TrackerState, i: number) => void;
    i: number;
}) {
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

function Tracker({
    trackable,
    changeTrackable
}: {
    trackable: Trackable;
    changeTrackable: (trackable: Trackable) => void;
}) {
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

const IndexPage = () => {
    const [kindred, setKindred] = useState(dummyData);

    const changeKindred = (kindredName: string, changedTrackable: Trackable) => {
        const newKindred = kindred.map((kin) =>
            kin.name == kindredName
                ? ({
                    name: kindredName,
                    trackable: kin.trackable.map((trackable) =>
                        trackable.name === changedTrackable.name ? changedTrackable : trackable
                    )
                } as Kindred)
                : kin
        );
        setKindred(newKindred);
    };

    return (
        <Layout title="Conclave">
            {kindred.map(({ name, trackable }) => (
                <div key={name}>
                    <h2>{name}</h2>
                    {trackable.map((t, i) => (
                        <Tracker
                            key={t.name}
                            trackable={t}
                            changeTrackable={(changedTrackable: Trackable) =>
                                changeKindred(name, changedTrackable)
                            }
                        />
                    ))}
                </div>
            ))}
        </Layout>
    );
};

export default IndexPage;
