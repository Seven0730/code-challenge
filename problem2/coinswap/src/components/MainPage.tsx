import SwapForm from "./SwapForm";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

function MainPage() {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "column",
        p: 2,
        pt: 15,
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 2 }}
        transition={{ duration: 0.8 }}
        sx={{
          background: "",
          borderRadius: "20px",
          p: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
        }}
      >
        <SwapForm />
      </Box>
    </Box>
  );
}

export default MainPage;
