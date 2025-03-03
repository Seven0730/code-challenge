import { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CurrencySelector from "./CurrencySelector";
import CurrencyInput from "./CurrencyInput";
import pricesData from "../data/prices.json";

interface PriceData {
  currency: string;
  date: string;
  price: number;
}
const priceMap: { [key: string]: number } = {};
(pricesData as PriceData[]).forEach((item) => {
  if (!(item.currency in priceMap)) {
    priceMap[item.currency] = item.price;
  }
});

function SwapForm() {
  const [sellCurrency, setSellCurrency] = useState<string | null>(null);
  const [sellAmount, setSellAmount] = useState<number>(0);
  const [sellSelectorOpen, setSellSelectorOpen] = useState<boolean>(false);

  const [buyCurrency, setBuyCurrency] = useState<string | null>(null);
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [buySelectorOpen, setBuySelectorOpen] = useState<boolean>(false);

  const handleSellAmountChange = (value: number) => {
    setSellAmount(value);
    if (sellCurrency && buyCurrency && priceMap[sellCurrency] && priceMap[buyCurrency]) {
      const newBuyAmount = value * (priceMap[sellCurrency] / priceMap[buyCurrency]);
      setBuyAmount(newBuyAmount);
    } else {
      setBuyAmount(0);
    }
  };

  const handleBuyAmountChange = (value: number) => {
    setBuyAmount(value);
    if (sellCurrency && buyCurrency && priceMap[sellCurrency] && priceMap[buyCurrency]) {
      const newSellAmount = value * (priceMap[buyCurrency] / priceMap[sellCurrency]);
      setSellAmount(newSellAmount);
    } else {
      setSellAmount(0);
    }
  };

  const handleSwap = () => {
    setSellCurrency(buyCurrency);
    setBuyCurrency(sellCurrency);
    setSellAmount(buyAmount);
    setBuyAmount(sellAmount);
  };

  const handleSellCurrencySelect = (selected: string | null) => {
    setSellCurrency(selected);
    setSellSelectorOpen(false);
    if (selected && buyCurrency && priceMap[selected] && priceMap[buyCurrency]) {
      setBuyAmount(sellAmount * (priceMap[selected] / priceMap[buyCurrency]));
    }
  };

  const handleBuyCurrencySelect = (selected: string | null) => {
    setBuyCurrency(selected);
    setBuySelectorOpen(false);
    if (sellCurrency && selected && priceMap[sellCurrency] && priceMap[selected]) {
      setBuyAmount(sellAmount * (priceMap[sellCurrency] / priceMap[selected]));
    }
  };


  const tokenSelected = sellCurrency && buyCurrency;
  const amountEntered = sellAmount > 0;
  const isReady = tokenSelected && amountEntered;
  const buttonText = !tokenSelected ? "select a token" : !amountEntered ? "enter amount" : "Trade";

  const sellUSDTValue = sellCurrency && priceMap[sellCurrency] ? sellAmount * priceMap[sellCurrency] : 0;
  const buyUSDTValue = buyCurrency && priceMap[buyCurrency] ? buyAmount * priceMap[buyCurrency] : 0;

  return (
    <Box
      sx={{
        position: "relative",
        padding: "0px",
        borderRadius: "10px",
        width: "600px",
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Sell part */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "18px",
            background: "#f5f5f5",
            paddingTop: "40px",
            paddingBottom: "30px",
            paddingLeft: "16px",
            paddingRight: "16px"
          }}
        >
          <Box sx={{ position: "absolute", top: "8px", left: "16px", fontSize: "14px", fontWeight: "bold", color: "#7e57c2" }}>
            From
          </Box>
          <CurrencyInput
            currency={sellCurrency}
            amount={sellAmount}
            onSelectCurrency={() => setSellSelectorOpen(true)}
            onAmountChange={handleSellAmountChange}
          />
          <Box sx={{ position: "absolute", bottom: "8px", left: "16px", fontSize: "12px", color: "#888" }}>
            ≈ {sellUSDTValue.toFixed(2)} USD
          </Box>
        </Box>

        {/* Buy part */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "18px",
            background: "#f5f5f5",
            paddingTop: "40px",
            paddingBottom: "30px",
            paddingLeft: "16px",
            paddingRight: "16px"
          }}
        >
          <Box sx={{ position: "absolute", top: "8px", left: "16px", fontSize: "14px", fontWeight: "bold", color: "#7e57c2" }}>
            To
          </Box>
          <CurrencyInput
            currency={buyCurrency}
            amount={buyAmount}
            onSelectCurrency={() => setBuySelectorOpen(true)}
            onAmountChange={handleBuyAmountChange}
          />
          <Box sx={{ position: "absolute", bottom: "8px", left: "16px", fontSize: "12px", color: "#888" }}>
            ≈ {buyUSDTValue.toFixed(2)} USD
          </Box>
        </Box>
      </Box>

      <IconButton
        onClick={handleSwap}
        sx={{
          position: "absolute",
          left: "50%",
          top: "42.5%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          color: "#3f51b5",
          borderRadius: "50%",
          boxShadow: 3,
          zIndex: 1,
          "&:hover": { backgroundColor: "#fff" }
        }}
      >
        <SwapVertIcon />
      </IconButton>


      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: "18px",
          backgroundColor: !tokenSelected ? "info.main" : isReady ? "#3f51b5" : "secondary.main",
          color: !tokenSelected ? "info.contrastText" : isReady ? "primary.contrastText" : "secondary.contrastText",
          "&:hover": {
            backgroundColor: !tokenSelected ? "info.dark" : isReady ? "#283593" : "secondary.dark"
          }
        }}
        disabled={!isReady}
        onClick={() => {
            alert("Please connect to the wallet");
        }}
      >
        {buttonText}
      </Button>
      
      <CurrencySelector open={sellSelectorOpen} onClose={handleSellCurrencySelect} />
      <CurrencySelector open={buySelectorOpen} onClose={handleBuyCurrencySelect} />
    </Box>
  );
}

export default SwapForm;
