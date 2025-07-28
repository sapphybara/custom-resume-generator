import { Lato, Merriweather_Sans } from "next/font/google";

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export { merriweatherSans, lato };
