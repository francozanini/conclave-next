import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {Kindred} from ".prisma/client";
import {useForm} from "react-hook-form";

import {trpc} from "../../utils/trpc";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {register, handleSubmit} = useForm();

  const {
    isLoading,
    isError,
    data: kindred,
  } = trpc.useQuery(["find-kindred", {kindredId: +kindredId}]);

  const mutation = trpc.useMutation(["update-kindred-details"]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  return (
    <section className="mx-2 mt-2">
      <Card>
        <form
          onSubmit={handleSubmit((data) =>
            mutation.mutate({...data, kindredId: +kindredId} as any),
          )}>
          <TextInput defaultValue={kindred.name} input={{...register("name")}} label="name" />
          <TextInput
            defaultValue={kindred.ambition}
            input={{...register("ambition")}}
            label="ambition"
          />
          <TextInput defaultValue={kindred.desire} input={{...register("desire")}} label="desire" />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit">
            Submit
          </button>
        </form>
      </Card>
    </section>
  );
};

export default KindredSheetPage;
