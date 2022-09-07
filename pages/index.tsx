import Link from 'next/link'
import Layout from '../components/Layout'
import {useEffect, useState} from "react";
import {GetStaticProps} from "next";
import {string} from "prop-types";

type TrackerState = 'empty' | 'superficial' | 'aggravated'

interface Point {
    state: TrackerState;
}

interface Trackable {
    name: 'humanity' | 'hunger' | 'health' | 'willpower';
    total: number;
    superficial: number;
    aggravated: number;
}

interface Kindred {
    name: string;
    trackable: Trackable[]
};

const dummyData: Kindred[] = [
    {
        name: 'Boris',
        trackable: [
            { name:'humanity', total: 6, superficial: 0, aggravated: 1},
            { name:'hunger', total: 5, superficial: 0, aggravated: 0},
            { name:'health', total: 5, superficial: 0, aggravated: 0},
            { name:'willpower', total: 5, superficial: 0, aggravated: 0},
        ],

    }
];

const arrayFromTrackable = (trackable: Trackable): Point[] =>
    Array.from({length: trackable.total}, (_, i) => ({ state: i < trackable.aggravated ? 'aggravated' : 'empty'}));

function PointC(props: { state: TrackerState }) {
    return (
        <div style={{backgroundColor: props.state === 'aggravated' ? 'black' : 'white' ,margin: '1px', border: '1px solid black', width: '20px', height: '20px'}}></div>
    );
}

function Tracker(props: Trackable) {
    const [points, setPoints] = useState(arrayFromTrackable(props))

    return (
        <div style={{display: 'flex'}}>
            <h3>{props.name}</h3>
            {
                points.map((point, index) => (
                    <PointC key={index} {...point}/>
                ))
            }
        </div>
    );
}

const IndexPage = () => {
    const [kindred, _] = useState(dummyData);
    return (<Layout title="Conclave">
        {
            kindred.map(({name,  trackable}) => (
                <div key={name}>
                    <h2>{name}</h2>
                    {
                        trackable.map((t, i) => (
                            <Tracker key={i} {...t}/>
                        ))
                    }
                </div>
            ))
        }

    </Layout>);
}

export default IndexPage;
