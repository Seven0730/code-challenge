import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function TopBar() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: "#3f51b5", 
        boxShadow: "none",
        px: 2,
        py: 1
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            CoinSwap
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="text" sx={{ color: "#fff", textTransform: "none" }}>
            Home
          </Button>
          <Button variant="text" sx={{ color: "#fff", textTransform: "none" }}>
            Features
          </Button>
          <Button variant="text" sx={{ color: "#fff", textTransform: "none" }}>
            Pricing
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#3f51b5",
              borderRadius: "50px",
              textTransform: "none",
              px: 2,
              "&:hover": { backgroundColor: "#f0f0f0" }
            }}
          >
            Connect to Wallet
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
