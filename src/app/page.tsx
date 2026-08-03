import { BuildTeaser } from '@/components/home/BuildTeaser';
import { Featured } from '@/components/home/Featured';
import { Hero } from '@/components/home/Hero';
import { LocationTeaser } from '@/components/home/LocationTeaser';
import { Stats } from '@/components/home/Stats';
import { Story } from '@/components/home/Story';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Featured />
      <BuildTeaser />
      <Story />
      <LocationTeaser />
    </>
  );
}
