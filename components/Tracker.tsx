import {TrackerState} from "../interfaces";
import {inferQueryResponse} from "../pages/api/trpc/[trpc]";

import TrackerCell from "./TrackerCell";

interface Props {
  trackable: TrackableFromServer;
  changeTrackable: (trackable: TrackableFromServer) => void;
}

export const withTrackerSymbols = (trackable: {aggravated: number, superficial: number, max: number}): TrackerState[] => {
  const trackableCopy = {...trackable};
  const symbols: TrackerState[] = [];

  for (let i = 0; i < trackable.max; i++) {
    if (trackableCopy.aggravated > 0) {
      trackableCopy.aggravated--;
      symbols.push("aggravated");
    } else if (trackableCopy.superficial > 0) {
      trackableCopy.superficial--;
      symbols.push("superficial");
    } else {
      symbols.push("empty");
    }
  }

  return symbols;
};

export default function Tracker({trackable, changeTrackable}: Props) {
  const changeTracker = (previousState: TrackerState, nextState: TrackerState) => {
    if (previousState === "aggravated") {
      trackable.aggravatedDamage--;
    } else if (previousState === "superficial") {
      trackable.superficialDamage--;
    }

    if (nextState === "aggravated") {
      trackable.aggravatedDamage++;
    } else if (nextState === "superficial") {
      trackable.superficialDamage++;
    }

    changeTrackable(trackable);
  };

  return (
    <div className={"flex justify-around "}>
      <h3 className={"capitalize text-xl "}>{trackable.name}</h3>
      <div className={"flex"}>
        {withTrackerSymbols(trackable).map((track, index) =>
            <TrackerCell key={index} changeKindred={changeTracker} i={index} state={track} />
        )}
      </div>
    </div>
  );
}
