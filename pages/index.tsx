import Layout from '../components/Layout';
import { useState } from 'react';
import { Kindred, Trackable } from '../interfaces';
import Tracker from '../components/Tracker';

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

const IndexPage = () => {
    const [kindred, setKindred] = useState(dummyData);

    const changeKindredTrackable = (kindredName: string, changedTrackable: Trackable) => {
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
                    {trackable.map((t) => (
                        <Tracker
                            key={t.name}
                            trackable={t}
                            changeTrackable={(changedTrackable: Trackable) =>
                                changeKindredTrackable(name, changedTrackable)
                            }
                        />
                    ))}
                </div>
            ))}
        </Layout>
    );
};

export default IndexPage;
