export const metadata = {
  title: "Tradexa",
  description: "Crypto Exchange Platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
