import type { Metadata } from 'next';
import { AboutView } from '@/components/site/AboutView';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chatime is a globally recognised Taiwanese bubble tea chain serving an authentic bubble tea experience — brewed fresh at Havelock City Mall, Colombo.',
};

export default function AboutPage() {
  return <AboutView />;
}
