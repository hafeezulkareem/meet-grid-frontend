import { TextField } from "@mui/material";
import { ITextInput } from "../types";

const TextInput = ({
  value,
  setValue,
  isEmpty,
  helperText,
  name,
  type,
  autoFocus,
}: ITextInput) => {
  return (
    <TextField
      required
      label={name}
      name={name}
      autoFocus={autoFocus}
      value={value}
      type={type}
      onChange={(e) => setValue(e.target.value)}
      sx={{ width: "366px", height: "54px", mt: 4 }}
      error={isEmpty}
      helperText={isEmpty ? helperText : ""}
    />
  );
};

export default TextInput;
