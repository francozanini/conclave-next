import {Kindred} from "../pages/kindred/[id]";
import {AttributeName} from "../types/AttributeName";
import capitalize from "../utils/capitalize";
import {trpc} from "../utils/trpc";

import Card from "./Card";
import Trackable from "./Trackable";

interface AttributeProps {
  name: AttributeName;
  amount: number;
  className?: string;
  onChange: (newAmount: number) => void;
}

const Attribute = ({name, amount, className = "", onChange}: AttributeProps) => {
  return (
    <div className={`flex flex-row justify-between ${className}`}>
      <span className="text-xl">{capitalize(name)}</span>
      <Trackable amount={amount} onChange={(newAmount) => onChange(newAmount)} />
    </div>
  );
};

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
}: Kindred & {refetch: any}) => {
  const changeAttribute = trpc.useMutation("change-atribute", {onSuccess: () => refetch()});
  const attributes = [
    [
      {amount: strength, name: AttributeName.strength, type: "physical"},
      {amount: dexterity, name: AttributeName.dexterity, type: "physical"},
      {amount: stamina, name: AttributeName.stamina, type: "physical"},
    ],
    [
      {amount: charisma, name: AttributeName.charisma, type: "social"},
      {amount: manipulation, name: AttributeName.manipulation, type: "social"},
      {amount: composure, name: AttributeName.composure, type: "social"},
    ],
    [
      {amount: intelligence, name: AttributeName.intelligence, type: "mental"},
      {amount: wits, name: AttributeName.wits, type: "mental"},
      {amount: resolve, name: AttributeName.resolve, type: "mental"},
    ],
  ];

  return (
    <Card>
      <h1 className="text-center text-4xl">Attributes</h1>
      <>
        {attributes.map((attrs, i) => (
          <div
            key={attrs[i].type}
            className="border-b p-4 border-solid border-opacity-5 2xl:border-b-0 2xl:border-r last:border-b-0 last:border-r-0">
            <h2 className="capitalize text-2xl text-center mb-2">{attrs[i].type}</h2>
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
      </>
    </Card>
  );
};

export default Attributes;
