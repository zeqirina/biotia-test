import ReactSelect, { ActionMeta, SingleValue, Props } from "react-select";

interface SelectI extends Props {
  handleOnChange: (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  value: Option | undefined;
  className: string;
  options: Option[] | undefined;
}

interface Option {
  name: string;
  url: string;
}

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    color: "#111827",
  }),
};

const formatOptionLabel = ({ name, url }: Option) => {
  return (
    <div className="flex">
      <div>{name}</div>
    </div>
  );
};

export const Select = (props: SelectI) => {
  return (
    <ReactSelect
      styles={customStyles}
      value={props.value}
      onChange={props.handleOnChange}
      className={props.className}
      formatOptionLabel={formatOptionLabel}
      options={props.options}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#6366f1",
        },
      })}
    />
  );
};
