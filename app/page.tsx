import Customiser from "@/components/Customiser";
import Footer from "@/components/Footer";
import Franchise from "@/components/Franchise";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import Menu from "@/components/Menu";
import Nav from "@/components/Nav";
import Story from "@/components/Story";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Menu />
        <Customiser />
        <Locations />
        <Franchise />
      </main>
      <Footer />
    </>
  );
}
