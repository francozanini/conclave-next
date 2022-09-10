import {useEffect, useState} from "react";

import {Kindred, Trackable} from "../interfaces";
import Tracker from "../components/Tracker";
import {trpc} from "../utils/trpc";

import {fetchKindred} from "./api/KindredApi";

const IndexPage = () => {
  const retrieved = trpc.useQuery(["find-kindred"]); // usar retrieved.data y retrieved.isLoading en vez de useState.

  // usar trpc.useMutation en vez de setKindred
  // ver como mierda usar los tipos de prisma
  console.log(retrieved);

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
              trackable.name === changedTrackable.name ? changedTrackable : trackable,
            ),
          } as Kindred)
        : kin,
    );

    setKindred(newKindred);
  };

  return (
    <section className={"flex flex-col flex-wrap justify-center md:flex-row items-center m-2 p-1 "}>
      {kindred.map(({name, trackable}) => (
        <div key={name} className={"bg-gray-800 shadow-md p-6 max-w-sm my-1 md:mx-2 rounded-lg"}>
          <h2 className={"mb-2 text-4xl font-bold capitalized text-center"}>{name}</h2>
          <div className="w-full border-b border-gray-300 mb-2" />
          {trackable.map((t) => (
            <Tracker
              key={t.name}
              changeTrackable={(changedTrackable: Trackable) =>
                changeKindredTrackable(name, changedTrackable)
              }
              trackable={t}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default IndexPage;
