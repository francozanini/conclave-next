interface Props {
  label: string;
  defaultValue: string;
  input: React.InputHTMLAttributes<HTMLInputElement>;
}

const TextInput = ({label, defaultValue = '', input}: Props) => {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        {...input}
        className="peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
        defaultValue={defaultValue}
        type="text"
      />
      <label
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        htmlFor="floating_email">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
    </div>
  );
};

export default TextInput;
