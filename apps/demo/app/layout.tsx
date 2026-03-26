export const metadata = {
  title: 'Measurably Better',
  description: 'Regional Technology Provider for the Deep South',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
