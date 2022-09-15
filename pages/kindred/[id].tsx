import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {Kindred} from ".prisma/client";
import {useForm} from "react-hook-form";

import {trpc} from "../../utils/trpc";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";

function debounce(func, wait) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {register, getValues} = useForm();
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

  const handleChange = debounce((e) => {
    mutation.mutate({...getValues(), kindredId: +kindredId} as any);
  }, 300);

  return (
    <section className="mx-2 mt-2">
      <Card>
        <form>
          <TextInput defaultValue={kindred.name} input={{...register("name")}} label="name" />
          <TextInput
            defaultValue={kindred.ambition}
            input={{...register("ambition")}}
            label="ambition"
          />
          <TextInput
            defaultValue={kindred.desire}
            input={{...register("desire"), onChange: handleChange}}
            label="desire"
          />
          <TextInput
            defaultValue={kindred.sire}
            input={{...register("sire"), onChange: handleChange}}
            label="sire"
          />
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="countries">
            <option>Choose a clan</option>
            <option value="BRUJAH">Brujah</option>
          </select>
        </form>
      </Card>
    </section>
  );
};

export default KindredSheetPage;
