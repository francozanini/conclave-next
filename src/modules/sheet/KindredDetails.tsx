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
      <TextInput
        defaultValue={sire}
        input={{...register('sire'), onChange: handleChange}}
        label="sect"
      />
      <TextInput
        defaultValue={sire}
        input={{...register('sire'), onChange: handleChange}}
        label="Age"
      />
    </Card>
  );
};

export default KindredDetails;
