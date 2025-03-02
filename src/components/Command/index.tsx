import {
  Command as ShadcnCommand,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRef, useState } from "react";

interface IProps {
  commandData: { value: string; label: string }[];
  placeholder: string;
  onSelect: (value: string) => void;
}

export default function Command(props: IProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { commandData, placeholder, onSelect } = props;
  return (
    <ShadcnCommand className="">
      <CommandInput
        placeholder={placeholder}
        ref={inputRef}
        value={inputValue}
        onValueChange={(search) => {
          setInputValue(search);
        }}
      />
      <CommandList hidden={!inputValue}>
        <CommandGroup>
          {commandData.map((item, i) => (
            <CommandItem
              key={i}
              onSelect={(value) => {
                onSelect(value);
                setInputValue("");
              }}
            >
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </ShadcnCommand>
  );
}
