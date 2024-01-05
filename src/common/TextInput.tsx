import { TextField } from "@mui/material";
import { ITextInput } from "../types";

const TextInput = ({
  value,
  setValue,
  isError,
  helperText,
  name,
  type,
  autoFocus,
  InputProp,
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
      sx={{ width: "364px", height: "52px", mt: 4 }}
      error={isError}
      helperText={isError ? helperText : ""}
      InputProps={{
        endAdornment: InputProp && (
          <div style={{ padding: "10px" }}>@gmail.com</div>
        ),
      }}
    />
  );
};

export default TextInput;
