import { ClanName } from "@prisma/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import { debounce } from "../../utils/debounce";
import { trpc } from "../../utils/trpc";


const KindredSheetPage = () => {
  const {id: kindredId} = useRouter().query;
  const {register, getValues} = useForm();
  const {
    isLoading,
    isError,
    data: kindred,
  } = trpc.useQuery(["find-kindred", {kindredId: +kindredId}]);
  const detailsMutation = trpc.useMutation(["update-kindred-details"]);
  const clanMutation = trpc.useMutation(["pick-clan"]);
  const clans = Object.values(ClanName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !kindred) {
    return <div>Kindred not found</div>;
  }

  const handleChange = debounce((e) => {
    detailsMutation.mutate({...getValues(), kindredId: +kindredId} as any);
  }, 300);

  return (
    <section className="mx-2 mt-2">
      <Card>
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
          defaultValue={kindred.clan.name}
          name="clans"
          onChange={(e) =>
            clanMutation.mutate({chosenClan: e.target.value as ClanName, kindredId: +kindredId})
          }>
          {clans.map((clan) => (
            <option key={clan} value={clan}>
              {clan}
            </option>
          ))}
        </select>
      </Card>
    </section>
  );
};

export default KindredSheetPage;
