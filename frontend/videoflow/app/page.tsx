import Style from "./components/UI/styles";
import PrimaryButton from "./components/PrimaryButton/PrimaryButton";


export default function Home() {
    return (
        <>
            
            <section className="relative px-4 sm:px-8 md:px-16 lg:px-24 transition-all mt-80px">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center transition-all py-6 font-bold tracking-tight leading-tight">
                    Converti tus videos <br />
                    horizontales en{" "}
                    <span className="text-blue-700">
                        shorts
                    </span>{" "}
                    <br />
                    <span className="text-blue-700">
                        listos para compartir
                    </span>
                </h1>

                <Style />

                <h5 className="text-gray-500 text-[10px] sm:text-sm md:text-base mt-12 max-w-xl mx-auto text-center leading-relaxed">
                    Subí tu video horizontal, seleccioná los
                    mejores momentos y exportá cortos
                    verticales para{" "}
                    <span className="text-gray-800">
                        TikTok, Reels y YouTube Shorts
                    </span>{" "}
                    en segundos.
                </h5>

                <PrimaryButton />
            </section>
        </>
    );
}
