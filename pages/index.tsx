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
    total: number;
    superficial: number;
    aggravated: number;
}

interface Kindred {
    name: string;
    trackable: Trackable[];
}

const dummyData: Kindred[] = [
    {
        name: 'Boris',
        trackable: [
            { name: 'humanity', total: 6, superficial: 0, aggravated: 1 },
            { name: 'hunger', total: 5, superficial: 0, aggravated: 0 },
            { name: 'health', total: 5, superficial: 0, aggravated: 0 },
            { name: 'willpower', total: 5, superficial: 0, aggravated: 0 }
        ]
    }
];

const arrayFromTrackable = (trackable: Trackable): Point[] => {
    console.log(trackable);
    const from = Array.from(
        { length: trackable.total },
        (_, i) =>
            ({
                index: i,
                state: i < trackable.aggravated ? 'aggravated' : 'empty'
            } as Point)
    );
    console.log(from);
    return from;
};

function Tracker({ trackable, changeKindred }) {
    const points = arrayFromTrackable(trackable);

    return (
        <div style={{ display: 'flex' }}>
            <h3>{trackable.name}</h3>
            {points.map((point) => {
                const backgroundColor = point.state === 'aggravated' ? 'pink' : 'white';
                return (
                    <div
                        key={point.index}
                        style={{
                            backgroundColor: backgroundColor,
                            margin: '1px',
                            border: '1px solid black',
                            width: '20px',
                            height: '20px'
                        }}
                        onClick={() => {
                            changeKindred(
                                trackable.name,
                                point.state === 'empty' ? trackable.aggravated + 1 : trackable - 1
                            );
                        }}></div>
                );
            })}
        </div>
    );
}

const IndexPage = () => {
    const [kindred, setKindred] = useState(dummyData);

    const changeKindred = (kindredName: string, trackable: Trackable[]) => {
        const newKindred = kindred.map((kin) =>
            kin.name == kindredName ? ({ name: kindredName, trackable } as Kindred) : kin
        );
        setKindred(newKindred);
        console.log(kindred);
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
                            changeKindred={(trackableName: TrackableName, aggravated: number) =>
                                changeKindred(
                                    name,
                                    trackable.map((t2) =>
                                        t2.name === trackableName ? { ...t2, aggravated } : t2
                                    )
                                )
                            }
                        />
                    ))}
                </div>
            ))}
        </Layout>
    );
};

export default IndexPage;
