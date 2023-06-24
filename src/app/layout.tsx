import './globals.css';

export const metadata = {
  title: '밈/짤방 생성기',
  description: '간편하게 밈/짤방을 만들어보세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
