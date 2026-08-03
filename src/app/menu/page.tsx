import type { Metadata } from 'next';
import { MenuBrowser } from '@/components/menu/MenuBrowser';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Every Chatime cup we make in Colombo — milk teas, fruit teas, slushes and signatures. Build yours with five sugar levels, four ice levels and ten toppings.',
};

export default function MenuPage() {
  return <MenuBrowser />;
}
