import Style from "./components/UI/styles";
import PrimaryButton from "./components/PrimaryButton/PrimaryButton";
import Card from "./components/card/card";
import AppInstructions from "./components/appInstructions/appInstructions";
import BottomSection from "./components/bottomSection/BottomSection";
import Carrusel from "./components/carrusel/carrusel";
export default function Home() {
    return (
        <>
            <section className="grid grid-cols-[1fr_auto] items-center py-10 lg:pt-14 px-4 sm:px-8 md:px-16 lg:px-24 transition-all">
                <div>
                    <h1 className="text-[#000000] text-[18px] sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Converti tus videos <br />
                        horizontales en shorts <br />
                        listos para compartir
                    </h1>

                    <h5 className="text-gray-500 text-[10px] sm:text-sm md:text-base mt-4 sm:mt-6 md:mt-8 leading-relaxed">
                        Subí tu video horizontal, seleccioná
                        los mejores momentos y exportá
                        cortos verticales para{" "}
                        <span className="text-gray-800">
                            TikTok, Reels y YouTube Shorts
                        </span>{" "}
                        en segundos.
                    </h5>

                    <div className="mt-6">
                        <PrimaryButton />
                    </div>
                </div>

                <Style />
            </section>
            <Carrusel />
            <Card />
            <AppInstructions />
            <BottomSection />
        </>
    );
}
