import React, { useState } from "react";
import { Statistic, InputNumber } from "antd";

const NumberFormatter = ({ value }: { value: number | null | undefined }) => {
  const [number, setNumber] = useState<number | null | undefined>(value);

  const handleChange = (value?: string | number | null) => {
    if (!value || isNaN(Number(value)) || typeof value === "string")
      setNumber(undefined);

    setNumber(Number(value));
  };

  return (
    <div>
      <InputNumber
        placeholder="Enter a number"
        onChange={handleChange}
        style={{ marginBottom: 16 }}
        min={0}
        step={0.01}
        precision={2}
        className="w-full"
      />
      <Statistic
        title="Formatted Number"
        value={number ?? undefined}
        precision={2}
        decimalSeparator=","
        groupSeparator="."
        formatter={(value) => {
          if (!value || isNaN(Number(value))) return undefined;

          return new Intl.NumberFormat("en-US").format(Number(value));
        }}
      />
    </div>
  );
};

export default NumberFormatter;
