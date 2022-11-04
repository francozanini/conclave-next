import {useMemo} from 'react';

import {Kindred} from '../../pages/kindred/[id]';
import {AttributeName} from '../../types/AttributeName';
import capitalize from '../../utils/formating/capitalize';
import {trpc} from '../../utils/trpcClient';
import Card from '../core/Card';

import Trackable from './Trackable';

interface AttributeProps {
  name: AttributeName;
  amount: number;
  className?: string;
  onChange: (newAmount: number) => void;
}

const Attribute = ({
  name,
  amount,
  className = '',
  onChange,
}: AttributeProps) => (
  <div className={`flex flex-row justify-between ${className}`}>
    <span className="mr-2 text-xl">{capitalize(name)}</span>
    <Trackable amount={amount} onChange={(newAmount) => onChange(newAmount)} />
  </div>
);

const Attributes = ({
  strength,
  dexterity,
  stamina,
  charisma,
  composure,
  manipulation,
  resolve,
  intelligence,
  wits,
  id,
  refetch,
}: Kindred & {refetch: Function}) => {
  const changeAttribute = trpc.kindred.changeAttribute.useMutation({
    onSuccess: () => refetch(),
  });
  const attributes = useMemo(
    () => [
      [
        {amount: strength, name: AttributeName.strength, type: 'physical'},
        {amount: dexterity, name: AttributeName.dexterity, type: 'physical'},
        {amount: stamina, name: AttributeName.stamina, type: 'physical'},
      ],
      [
        {amount: charisma, name: AttributeName.charisma, type: 'social'},
        {
          amount: manipulation,
          name: AttributeName.manipulation,
          type: 'social',
        },
        {amount: composure, name: AttributeName.composure, type: 'social'},
      ],
      [
        {
          amount: intelligence,
          name: AttributeName.intelligence,
          type: 'mental',
        },
        {amount: wits, name: AttributeName.wits, type: 'mental'},
        {amount: resolve, name: AttributeName.resolve, type: 'mental'},
      ],
    ],
    [
      strength,
      dexterity,
      stamina,
      charisma,
      manipulation,
      composure,
      intelligence,
      wits,
      resolve,
    ]
  );

  return (
    <Card className={'lg:max-w-fit'}>
      <h1 className="text-center text-4xl">Attributes</h1>
      <div className={'flex flex-col lg:flex-row'}>
        {attributes.map((attrs, i) => (
          <div
            key={attrs[i].type}
            className="border-b border-solid border-opacity-5 p-4 last:border-b-0 last:border-r-0 lg:border-b-0 lg:border-r">
            <h2 className="mb-2 text-center text-2xl capitalize">
              {attrs[i].type}
            </h2>
            {attrs.map((attr) => (
              <Attribute
                key={attr.name}
                amount={attr.amount}
                className="mb-1"
                name={attr.name}
                onChange={(newAmount: number) =>
                  changeAttribute.mutate({
                    newAmountOfPoints: newAmount,
                    attributeToChange: attr.name,
                    kindredId: id,
                  })
                }
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Attributes;
