import { CustomSelect } from "../ui/selector";

type YearSelectProps = {
  value: string;
  years: number[];
  onChange: (value: string) => void;
};

export function YearSelect({ value, years, onChange }: YearSelectProps) {
  return (
    <CustomSelect
      value={value}
      options={years.map((year) => ({
        label: String(year),
        value: String(year),
      }))}
      placeholder="All years"
      onChange={onChange}
    />
  );
}
