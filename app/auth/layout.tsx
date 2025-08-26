import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - ALX Polly',
  description: 'Login or register to access ALX Polly',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}