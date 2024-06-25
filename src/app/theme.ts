"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#003049", // Warna utama biru gelap keunguan
    },
    secondary: {
      main: "#d62828", // Warna sekunder (merah)
    },
    background: {
      default: "#121212", // Warna latar belakang utama
      paper: "#1e1e1e", // Warna latar belakang kertas atau area konten
    },
    text: {
      primary: "#ffffff", // Warna teks primer (putih)
      secondary: "#bdbdbd", // Warna teks sekunder (abu-abu)
    },
    error: {
      main: "#f44336", // Warna untuk pesan kesalahan (merah)
    },
    success: {
      main: "#4caf50", // Warna untuk pesan sukses (hijau)
    },
    warning: {
      main: "#ff9800", // Warna untuk pesan peringatan (oranye)
    },
    info: {
      main: "#2196f3", // Warna untuk pesan informasi (biru muda)
    },
  },
});

export default theme;
