import Customiser from "@/components/Customiser";
import DrinksSection from "@/components/DrinksSection";
import Footer from "@/components/Footer";
import Franchise from "@/components/Franchise";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Order from "@/components/Order";
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
        {/* Drinks lead, the way the Australian site opens on its categories. */}
        <DrinksSection />
        <Toppings />
        <Customiser />
        <Rewards />
        <Order />
        <Story />
        <Locations />
        <Franchise />
      </main>
      <Footer />
    </>
  );
}
