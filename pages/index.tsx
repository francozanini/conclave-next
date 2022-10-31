import {UseQueryResult} from 'react-query';

import {trpc} from '../utils/trpc';

import {inferQueryResponse} from './api/trpc/[trpc]';

type Chronicle = inferQueryResponse<'chronicle.find-chronicle'>;

const IndexPage = () => {
  const {
    data: chronicle,
    isLoading,
    refetch,
  }: UseQueryResult<Chronicle> = trpc.useQuery(['chronicle.find-chronicle', {chronicleId: 1}]);

  return (
    chronicle && (
      <section>
        <h1 className={'text-center text-8xl'}>{chronicle.name}</h1>
        <div className={'m-2 flex flex-col flex-wrap items-center justify-center p-1 md:flex-row '}>
          {chronicle.kindred.map(
            ({
              name,
              aggravatedHealth,
              superficialHealth,
              damagedHumanity,
              humanity,
              superficialWillpower,
              aggravatedWillpower,
              stamina,
              composure,
              resolution,
              hunger,
              experience,
            }: Kindred) => (
              <div
                key={name}
                className={'my-1 max-w-sm rounded-lg bg-gray-800 p-6 shadow-md md:mx-2'}>
                <h2 className={'capitalized mb-2 text-center text-4xl font-bold'}>{name}</h2>
                <div className="mb-2 w-full border-b border-gray-300" />
                <div className="flex flex-col">
                  <div>{experience} points of experience</div>
                  <div>{hunger} hunger</div>
                  {/* <Incrementable
                    currentAmount={hunger}
                    decrease={() => console.log(hunger)}
                    increase={() => console.log(hunger)}
                    label={"hunger"}
                  />
                  <Tracker
                    aggravated={aggravatedHealth}
                    max={stamina + 3}
                    name="health"
                    superficial={superficialHealth}
                  />
                  <Tracker
                    aggravated={aggravatedWillpower}
                    max={composure + resolution}
                    name="willpower"
                    superficial={superficialWillpower}
                  /> */}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    )
  );
};

// const Tracker = ({
//   name,
//   aggravated,
//   superficial,
//   max,
// }: {
//   name: string;
//   aggravated: number;
//   superficial: number;
//   max: number;
// }) => {
//   return (
//     <div className={"flex justify-around "}>
//       <h3 className={"capitalize text-xl"}>{name}</h3>
//       <div className={"flex"}>
//         {withTrackerSymbols({aggravated, superficial, max}).map((track, index) => {
//           return <TrackerCell key={index} i={index} state={track} />;
//         })}
//       </div>
//     </div>
//   );
// };

export default IndexPage;
