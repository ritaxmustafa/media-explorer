import type { Genre } from "@/types/video";
import { CustomSelect } from "../ui/selector";

type GenreSelectProps = {
  value: string[];
  genres: Genre[];
  onChange: (value: string[]) => void;
};

export function GenreSelect({ value, genres, onChange }: GenreSelectProps) {
  return (
    <CustomSelect
      isMulti
      value={value}
      options={genres.map((genre) => ({
        label: genre.name,
        value: String(genre.id),
      }))}
      placeholder="Select genres"
      onChange={onChange}
    />
  );
}
