import {TrackerState} from "../interfaces";

interface Props {
  state: TrackerState;
  //changeKindred: (previousState: TrackerState, nextState: TrackerState) => void;
  i: number;
}

export default function TrackerCell({state, i}: Props) {
  const symbol = state === "aggravated" ? "X" : state === "superficial" ? "/" : "";

  return (
    <div className={"m-1 border-2 border-solid border-white h-8 w-8 text-center"}>
      {symbol}
    </div>
  );
}

const nextTrackerState = (state: TrackerState) => {
  const stateMappings = new Map<TrackerState, TrackerState>([
    ["empty", "superficial"],
    ["superficial", "aggravated"],
    ["aggravated", "empty"],
  ]);

  const nextState = stateMappings.get(state);

  if (!nextState) throw Error("we made a huge mistake");

  return nextState;
};
