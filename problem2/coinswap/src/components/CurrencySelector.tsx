import { Dialog, DialogTitle, List, ListItemText, ListItemButton, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";

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
    fetch('src/data/prices.json')
      .then(response => response.json())
      .then((data: Price[]) => {
        const currencyArray = data.map(item => item.currency);
        setCurrencies(currencyArray);
      })
      .catch(error => console.error('Error fetching data:', error));
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
                src={`/tokens/${currency}.svg`}
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
