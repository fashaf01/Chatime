import type { Metadata } from 'next';
import { LocationsView } from '@/components/site/LocationsView';

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Find Chatime in Colombo — Havelock City Mall, Level 2. Opening hours, directions and delivery.',
};

export default function LocationsPage() {
  return <LocationsView />;
}
