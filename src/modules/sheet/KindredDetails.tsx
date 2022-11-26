import {Clan, ClanName} from '@prisma/client';
import {useForm} from 'react-hook-form';

import {debounce} from '../../utils/debounce';
import {trpc} from '../../utils/trpcClient';
import removeUnderscoreAndCapitalize from '../../utils/formating/removeUnderscoreAndCapitalize';
import Card from '../core/Card';
import TextInput from '../core/TextInput';
import {Kindred} from '../../types/Kindred';

const KindredDetails = ({
  id,
  name,
  ambition,
  desire,
  sire,
  clan,
  updateKindred
}: Kindred & {clan: Clan; updateKindred: Function}) => {
  const {register, getValues, setValue} = useForm();
  const detailsMutation = trpc.kindred.updateDetails.useMutation();
  const clanMutation = trpc.kindred.pickClan.useMutation();
  const clans = Object.values(ClanName);
  const handleChange = debounce(
    () => detailsMutation.mutate({...getValues(), kindredId: id} as any),
    200
  );

  return (
    <Card className={'max-w-md'}>
      <TextInput
        defaultValue={name}
        input={{
          ...register('name'),
          onChange: event => {
            setValue('name', event.target.value);
            handleChange();
          }
        }}
        label="name"
      />
      <TextInput
        defaultValue={ambition}
        input={{
          ...register('ambition'),
          onChange: event => {
            setValue('ambition', event.target.value);
            handleChange();
          }
        }}
        label="ambition"
      />
      <TextInput
        defaultValue={desire}
        input={{
          ...register('desire'),
          onChange: event => {
            setValue('desire', event.target.value);
            handleChange();
          }
        }}
        label="desire"
      />
      <TextInput
        defaultValue={sire}
        input={{...register('sire'), onChange: handleChange}}
        label="sire"
      />
      <select
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        defaultValue={clan.name}
        name="clans"
        onChange={e =>
          clanMutation.mutate(
            {
              chosenClanName: e.target.value as ClanName,
              kindredId: id
            },
            {onSuccess: updatedData => updateKindred(updatedData)}
          )
        }>
        {clans.map(clan => (
          <option key={clan} value={clan}>
            {removeUnderscoreAndCapitalize(clan)}
          </option>
        ))}
      </select>
    </Card>
  );
};

export default KindredDetails;
