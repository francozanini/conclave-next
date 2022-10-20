import {Clan, ClanName} from "@prisma/client";
import {useForm} from "react-hook-form";

import {Kindred} from "../../pages/kindred/[id]";
import {debounce} from "../../utils/debounce";
import {trpc} from "../../utils/trpc";
import {removeUnderscoreAndCapitalize} from "../../utils/RemoveUnderscoreAndCapitalize";
import Card from "../core/Card";
import TextInput from "../core/TextInput";

const KindredDetails = ({
  id,
  name,
  ambition,
  desire,
  sire,
  clan,
  updateKindred,
}: Kindred & {clan: Clan; updateKindred: Function}) => {
  const {register, getValues} = useForm();
  const detailsMutation = trpc.useMutation(["kindred.update-details"]);
  const clanMutation = trpc.useMutation(["kindred.pick-clan"]);
  const clans = Object.values(ClanName);
  const handleChange = debounce(
    () => detailsMutation.mutate({...getValues(), kindredId: id} as any),
    300,
  );

  return (
    <Card className={"min-w-md max-w-md"}>
      <TextInput defaultValue={name} input={{...register("name")}} label="name" />
      <TextInput defaultValue={ambition} input={{...register("ambition")}} label="ambition" />
      <TextInput
        defaultValue={desire}
        input={{...register("desire"), onChange: handleChange}}
        label="desire"
      />
      <TextInput
        defaultValue={sire}
        input={{...register("sire"), onChange: handleChange}}
        label="sire"
      />
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={clan.name}
        name="clans"
        onChange={(e) =>
          clanMutation.mutate(
            {
              chosenClanName: e.target.value as ClanName,
              kindredId: id,
            },
            {onSuccess: (updatedData) => updateKindred(updatedData)},
          )
        }>
        {clans.map((clan) => (
          <option key={clan} value={clan}>
            {removeUnderscoreAndCapitalize(clan)}
          </option>
        ))}
      </select>
    </Card>
  );
};

export default KindredDetails;
