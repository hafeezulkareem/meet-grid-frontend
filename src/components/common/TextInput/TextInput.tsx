import { TextField } from "@mui/material";

interface Props {
  value: string;
  setValue: (d: string) => void;
  isError: boolean;
  helperText: string;
  name: string;
  type: string;
  autoFocus?: boolean;
  addGmailDomain?: boolean;
}

export const TextInput = ({
  value,
  setValue,
  isError,
  helperText,
  name,
  type,
  autoFocus = false,
  addGmailDomain,
}: Props) => {
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
        endAdornment: addGmailDomain && (
          <div style={{ padding: "10px" }}>@gmail.com</div>
        ),
      }}
    />
  );
};
