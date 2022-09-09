import { Kindred, TrackerState } from '../../interfaces';

const arrayOfEmptyStates = (size): TrackerState[] => Array.from({ length: size }, () => 'empty');

const dummyData: Kindred[] = [
    {
        name: 'Boris',
        trackable: [
            { name: 'humanity', track: arrayOfEmptyStates(6) },
            { name: 'hunger', track: arrayOfEmptyStates(5) },
            { name: 'health', track: arrayOfEmptyStates(5) },
            { name: 'willpower', track: arrayOfEmptyStates(5) }
        ]
    }
];

const fetchKindred = async () => {
    return dummyData;
};

export { fetchKindred };
