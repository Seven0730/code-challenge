import React, { useState, useEffect, useRef } from "react";
import { TextField, Box, Button } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface CurrencyInputProps {
  currency: string | null;
  amount: number;
  onSelectCurrency: () => void;
  onAmountChange: (value: number) => void;
}

function CurrencyInput({ currency, amount, onSelectCurrency, onAmountChange }: CurrencyInputProps) {
  const [inputValue, setInputValue] = useState(amount === 0 ? "" : amount.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setInputValue(amount === 0 ? "" : amount.toString());
    }
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      if (value !== "" && !value.endsWith(".")) {
        onAmountChange(parseFloat(value));
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || inputValue === ".") {
      setInputValue("");
      onAmountChange(0);
    } else {
      onAmountChange(parseFloat(inputValue));
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <TextField
        variant="outlined"
        inputRef={inputRef}
        value={inputValue}
        onChange={handleAmountChange}
        onBlur={handleBlur}
        placeholder="0"
        fullWidth
        onClick={() => !currency && onSelectCurrency()}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none"
            },
            "&:hover fieldset": {
              border: "none"
            },
            "&.Mui-focused fieldset": {
              border: "none"
            }
          },
          input: {
            textAlign: "left",
            fontSize: "18px"
          }
        }}
      />

      <Button
        variant="contained"
        onClick={onSelectCurrency}
        sx={{
          backgroundColor: currency ? "#fff" : "#3f51b5",
          color: currency ? "#000" : "#fff",
          whiteSpace: "nowrap",
          flexShrink: 0,
          fontSize: "16px",
          borderRadius: "50px",
          "&:hover": {
            backgroundColor: currency ? "#f0f0f0" : "#0d47a1"
          }
        }}
      >
        {currency ? (
          <>
            <img
              src={`/tokens/${currency}.svg`}
              alt={currency}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {currency}
          </>
        ) : "select token"}
        <ArrowDropDownIcon sx={{ marginLeft: 1 }} />
      </Button>
    </Box>
  );
}

export default CurrencyInput;
