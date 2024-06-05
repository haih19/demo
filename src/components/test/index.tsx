import { FocusEventHandler, useState } from "react";
import { InputNumber, InputNumberProps } from "antd";

type Props = InputNumberProps;

const currency = (value?: number | string | null): string => {
  if (
    !value ||
    isNaN(parseFloat(value.toString().replace(/\./g, "").replace(/,/, ".")))
  )
    return "";

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  })
    .format(Number(value))
    .replace(/€/g, "")
    ?.trim();
};

export default function TestInput({
  controls = false,
  onChange,
  onBlur,
  ...rest
}: Props) {
  const [value, setValue] = useState<number | string | undefined | null>(
    rest?.value ? currency(rest.value) : undefined,
  );

  const parseValue = (str?: string): number => {
    return str ? parseFloat(str.replace(/\./g, "").replace(/,/, ".")) : 0;
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);
    // Step1: get Target
    const target = event.target.value;
    console.log("Step1: get target>>>>", target);

    // step2: convert value
    const convert = parseValue(target);
    console.log("Step2: convert value>>>>", convert);

    // step3: format currency
    const formatted = currency(convert);

    console.log("Step3: format currency>>>>", formatted);
    if (formatted !== value) {
      setValue(formatted);
      const p = parseValue(formatted);
      onChange?.(p ?? null);
    }
  };

  const handleChange = (value?: number | string | null) => {
    setValue(value);
  };

  return (
    <InputNumber
      {...rest}
      controls={controls}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-full"
      //   parser={value => Number(value) === 0 ? '' : parseValue(value)}
      //   parser={parseValue}
    />
  );
}
