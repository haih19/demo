import React from "react";
import { InputNumber } from "antd";

const formatNumber = (
  value: number | null = 0,
  fractionDigits: number = 2,
): string => {
  if (!value || value === null || value === undefined || isNaN(value))
    return "0.00";
  let [integerPart] = value.toFixed(fractionDigits).split(".");
  const [, fractionPart] = value.toFixed(fractionDigits).split(".");
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${integerPart},${fractionPart}`;
};

export const NumberInput: React.FC<{
  value?: number | null;
  onChange: (value: number | null) => void;
}> = ({ value, onChange }) => {
  const [formattedValue, setFormattedValue] = React.useState<string>("");

  const handleBlur = () => {
    setFormattedValue(formatNumber(value));
  };

  return (
    <InputNumber
      value={formattedValue}
      onChange={(val) => {
        if (typeof val === "number") {
          onChange(val);
        }
      }}
      controls={false}
      onBlur={handleBlur}
      className="w-full"
    />
  );
};
