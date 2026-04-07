import "./globals.css";

export const metadata = {
  title: "더몬스터학원 월간 소식지",
  description: "더몬스터학원 월간 소식지 생성기",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
