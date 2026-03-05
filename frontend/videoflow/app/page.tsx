import Style from "./components/UI/styles";
import PrimaryButton from "./components/PrimaryButton/PrimaryButton";
import Card from "./components/card/card";
import AppInstructions from "./components/appInstructions/appInstructions";
import BottomSection from "./components/bottomSection/BottomSection";
import Carrusel from "./components/carrusel/carrusel";
import Reveal from "./components/Reveal/Reveal";
export default function Home() {
    return (
        <>
            <section className="grid grid-cols-[1fr_auto] items-center px-4 py-10 transition-all sm:px-8 md:px-16 lg:px-24 lg:pt-14">
                <div>
                    <h1 className="text-[18px] font-bold text-[#000000] sm:text-4xl md:text-5xl lg:text-6xl">
                        Converti tus videos <br />
                        horizontales en shorts <br />
                        listos para compartir
                    </h1>

                    <h5 className="mt-4 text-[10px] leading-relaxed text-gray-500 sm:mt-6 sm:text-sm md:mt-8 md:text-base">
                        Subí tu video horizontal, seleccioná los mejores
                        momentos y descarga cortos verticales para{" "}
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
            <Reveal>
                <Carrusel />
            </Reveal>
            <Reveal>
                <Card />
            </Reveal>
            <Reveal>
                <AppInstructions />
            </Reveal>
            <Reveal>
                <BottomSection />
            </Reveal>
        </>
    );
}
