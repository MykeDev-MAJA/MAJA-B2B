import FullScreenContent from "@/components/Home/FullScreenContent";
import { ServerProducts } from "@/components/Home/ServerProducts";
// import PaymentBanner from "@/components/Home/Components/PaymentBanner";
import CategoriasComponent from "./categorias/components/CategoriasComponent";
import TecnoBanner from "@/components/Home/Components/TecnoBanner";
export default function Home() {
  return (
    <>
      <FullScreenContent />
   <CategoriasComponent />
      <TecnoBanner />
      <ServerProducts />
      {/* <PaymentBanner /> */}
    </>
  );
}
