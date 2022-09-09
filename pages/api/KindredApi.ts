import { Kindred } from '../../interfaces';

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

const fetchKindred = async () => {
    return dummyData;
};

export { fetchKindred };
