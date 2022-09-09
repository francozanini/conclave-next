import { TrackerState } from './TrackerState';
import { TrackableName } from '../types/TrackableName';

export interface Trackable {
    name: TrackableName;
    track: TrackerState[];
}
