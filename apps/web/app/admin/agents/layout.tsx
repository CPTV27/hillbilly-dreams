import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agents',
  description: 'Registry-backed agent tools — Command Plane',
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
