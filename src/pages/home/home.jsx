import HomeSec from "./home-sec";
import NavBar from "../../component/navbar";
import NewArrivalSec from "./new-arrival-sec";
import SaleSec from "./sale-sec";
import Footer from "../../component/footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <HomeSec />
      <NewArrivalSec />
      <SaleSec />
      <Footer />
    </>
  );
}
