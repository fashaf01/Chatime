import Bestsellers from "@/components/Bestsellers";
import Customiser from "@/components/Customiser";
import DrinksSection from "@/components/DrinksSection";
import Footer from "@/components/Footer";
import Franchise from "@/components/Franchise";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Order from "@/components/Order";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Rewards from "@/components/Rewards";
import Story from "@/components/Story";
import Toppings from "@/components/Toppings";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        {/* Drinks lead, the way the Australian site opens on its categories:
            ranges first, then the shortlist, then the full grid. */}
        <DrinksSection />
        <Toppings />
        <Process />
        <Customiser />
        <Rewards />
        <Story />
        <Reviews />
        <Order />
        <Locations />
        <Newsletter />
        <Franchise />
      </main>
      <Footer />
    </>
  );
}
