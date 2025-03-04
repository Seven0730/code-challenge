import { Dialog, DialogTitle, List, ListItemText, ListItemButton, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import pricesData from "../assets/data/prices.json";

const tokens = import.meta.glob('../assets/tokens/*.svg', { eager: true, query: '?url', import: 'default' });
const tokenImages: Record<string, string> = {};
for (const path in tokens) {
  const fileName = path.split("/").pop()?.split(".")[0];
  if (fileName) {
    tokenImages[fileName] = tokens[path] as string;
  }
}

interface Price {
  currency: string;
}

interface CurrencySelectorProps {
  open: boolean;
  onClose: (currency: string | null) => void;
}

function CurrencySelector({ open, onClose }: CurrencySelectorProps) {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currencyArray = (pricesData as Price[]).map(item => item.currency);
    setCurrencies(currencyArray);
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  const filteredCurrencies = currencies.filter(currency =>
    currency.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={() => onClose(null)}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "18px",
            background: "#f5f5f5",
            p: 2,
            width: "600px",
            maxHeight: "80vh",
          }
        }
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#3f51b5",
          textAlign: "center",
          pb: 1,
        }}
      >
        Select a token
      </DialogTitle>

      {/* search bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          fullWidth
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        />
      </Box>

      <List>
        {filteredCurrencies.map((currency) => (
          <ListItemButton
            key={currency}
            onClick={() => onClose(currency)}
            sx={{
              borderRadius: "12px",
              my: 0.5,
              "&:hover": { backgroundColor: "#e8eaf6" }
            }}
          >
            <Box display="flex" alignItems="center">
              <img
                src={tokenImages[currency] || ""}
                alt={currency}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <ListItemText primary={currency} />
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}

export default CurrencySelector;
