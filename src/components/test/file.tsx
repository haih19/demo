import { FocusEventHandler, useEffect, useState } from "react";
import { InputNumber, InputNumberProps } from "antd";

type Props = InputNumberProps;

const formatCurrency = (value?: number | string | null): string => {
  if (
    !value ||
    isNaN(parseFloat(value.toString().replace(/\./g, "").replace(/,/, ".")))
  ) {
    return "";
  }
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(parseFloat(value.toString().replace(/\./g, "").replace(/,/, ".")));

  return formatted.replace(/\s?€/g, "").trim();
};

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
    currency(rest.value),
  );

  const parseValue = (value?: string): number => {
    return value ? parseFloat(value.replace(/\./g, "").replace(/,/, ".")) : 0;
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onBlur?.(event);
    // const target = event.target.value;

    // const value = parseValue(target).toString();

    if (
      typeof value === "number" ||
      (typeof value === "string" && value.trim() !== "")
    ) {
      const formattedValue = currency(value);
      if (formattedValue !== value) {
        setValue(formattedValue);
        onChange?.(value ? parseValue(value.toString()) : null);
      }
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
      parser={parseValue}
    />
  );
}
