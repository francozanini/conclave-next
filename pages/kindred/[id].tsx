import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {Kindred} from ".prisma/client";

import {trpc} from "../../utils/trpc";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const [kindred, setKindred] = useState<Kindred>({} as Kindred);
  const {isLoading, isError} = trpc.useQuery(["find-kindred", {kindredId: +kindredId}], {
    onSuccess: (data) => setKindred(data),
  });

  const mutation = trpc.useMutation(["update-kindred-details"]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Kindred not found</div>;
  }

  const handleSubmit = (changes: {
    name: string | undefined;
    desire: string | undefined;
    ambition: string | undefined;
  }) => {
    console.log(changes);
    console.log(kindred);
    mutation.mutate({kindredId: kindred.id, ...changes});
  };

  return (
    <section className="mx-2 mt-2">
      <Card>
        <TextInput
          handleChange={(newName: string) => setKindred({...kindred, name: newName})}
          label="name"
          value={kindred.name}
        />
        <TextInput
          handleChange={(newAmbition: string) => setKindred({...kindred, ambition: newAmbition})}
          label="ambition"
          value={kindred.ambition}
        />
        <TextInput
          handleChange={(newDesire: string) => setKindred({...kindred, desire: newDesire})}
          label="desire"
          value={kindred.desire}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
          onClick={() =>
            handleSubmit({
              name: kindred.name,
              desire: kindred.desire,
              ambition: kindred.ambition,
            })
          }>
          Submit
        </button>
      </Card>
    </section>
  );
};

export default KindredSheetPage;
