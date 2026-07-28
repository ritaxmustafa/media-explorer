import { ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type SelectOption = {
  label: string;
  value: string;
};

type SingleSelectProps = {
  isMulti?: false;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
};

type MultiSelectProps = {
  isMulti: true;
  value: string[];
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string[]) => void;
};

type CustomSelectProps = SingleSelectProps | MultiSelectProps;

export function CustomSelect(props: CustomSelectProps) {
  const selectedOptions = props.isMulti
    ? props.options.filter((option) => props.value.includes(option.value))
    : props.options.filter((option) => option.value === props.value);

  const buttonLabel = props.isMulti
    ? props.value.length > 0
      ? `${props.value.length} selected`
      : (props.placeholder ?? "Select")
    : (selectedOptions[0]?.label ?? props.placeholder ?? "Select");

  return (
    <div className={props.isMulti ? "space-y-3" : undefined}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="w-[170px] justify-between rounded-md text-gray-400 text-sm font-normal whitespace-nowrap"
            />
          }
        >
          {buttonLabel}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandEmpty>No options found.</CommandEmpty>

            <CommandGroup>
              {props.isMulti ? (
                <>
                  {props.value.length > 0 && (
                    <CommandItem onSelect={() => props.onChange([])}>
                      Clear all
                    </CommandItem>
                  )}

                  {props.options
                    .filter((option) => !props.value.includes(option.value))
                    .map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() =>
                          props.onChange([...props.value, option.value])
                        }
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                </>
              ) : (
                <>
                  <CommandItem onSelect={() => props.onChange("")}>
                    All
                  </CommandItem>

                  {props.options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => props.onChange(option.value)}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {props.isMulti && (
        <div className="flex flex-wrap w-full gap-2 max-w-[170px]">
          {selectedOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-1 border px-2 py-1 text-xs"
            >
              <span>{option.label}</span>

              <button
                type="button"
                onClick={() =>
                  props.onChange(
                    props.value.filter((value) => value !== option.value),
                  )
                }
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
