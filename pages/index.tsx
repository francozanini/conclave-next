import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { Kindred, Trackable } from '../interfaces';
import Tracker from '../components/Tracker';
import { fetchKindred } from './api/KindredApi';

const IndexPage = () => {
    const [kindred, setKindred] = useState([]);

    useEffect(() => {
        fetchKindred().then((data) => setKindred(data));
    }, []);

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
