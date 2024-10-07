import { Metadata } from "next";

import { Providers } from "../providers";
import { fonts } from "../fonts";
import { Layout } from "./components/Layout/Layout";

export const metadata: Metadata = {
  title: {
    default: "DICO - Decentralized ICOs",
    template: "%s | DICO",
  },
  description:
    "DICO is a decentralized application where web3 projects can raise decentralized and trustless funding",
  openGraph: {
    images: ["/images/logo-social.png"],
  },
  twitter: {
    images: ["/images/logo-social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
