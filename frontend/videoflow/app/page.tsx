import { Clock, Send, Zap } from "lucide-react";
import Style from "./components/UI/styles";
import PrimaryButton from "./components/PrimaryButton/PrimaryButton";
import Image from "next/image";


export default function Home() {
    return (
        <>
            
            <section className="relative px-4 sm:px-8 md:px-16 lg:px-24 transition-all mt-80px overflow-hidden">
                <h1 className="relative z-10 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center transition-all py-6 font-bold tracking-tight leading-tight">
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

            <section className="px-4 sm:px-8 md:px-16 lg:px-24 mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <article className="bg-white rounded-2xl border border-[#E6E6F2] shadow-sm p-6 text-center transition-all duration-1000 delay-300 hover:translate-y-2 hover:border-[#5C42B8] hover:shadow-[0_2px_4px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">
                        <div className="mx-auto w-12 h-12 rounded-full bg-[#EFEDFF] flex items-center justify-center">
                            <Zap className="w-5 h-5 text-[#5C4CE8]" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-gray-900">
                            Rapido
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Converti videos en segundos, no en horas. Sin necesidad de edicion compleja.
                        </p>
                    </article>

                    <article className="bg-white rounded-2xl border border-[#E6E6F2] shadow-sm p-6 text-center transition-all duration-1000 delay-300 hover:translate-y-2 hover:border-[#5C42B8] hover:shadow-[0_2px_4px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">
                        <div className="mx-auto w-12 h-12 rounded-full bg-[#EFEDFF] flex items-center justify-center">
                            <Clock className="w-5 h-5 text-[#5C4CE8]" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-gray-900">
                            Ahorra tiempo
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Concentrate en tu negocio mientras nosotros nos encargamos de la conversion de video.
                        </p>
                    </article>

                    <article className="bg-white rounded-2xl border border-[#E6E6F2] shadow-sm p-6 text-center transition-all duration-1000 delay-300  hover:translate-y-2 hover:border-[#5C42B8] hover:shadow-[0_2px_4px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">
                        <div className="mx-auto w-12 h-12 rounded-full bg-[#EFEDFF] flex items-center justify-center">
                            <Send className="w-5 h-5 text-[#5C4CE8]" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-gray-900">
                            Listo para publicar
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Exporta en formato perfecto para todas las principales plataformas sociales.
                        </p>
                    </article>
                </div>
            </section>

            <section className="px-4 sm:px-8 md:px-16 lg:px-24 mt-12">
                <div className="bg-[#433BFF] rounded-3xl p-6 sm:p-8 md:p-10 text-white">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Como funciona?
                    </h2>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#4D42F3] text-sm font-semibold">
                                1
                            </span>
                            <div>
                                <h4 className="font-semibold">Subi tu video</h4>
                                <p className="text-sm text-white/80">
                                    Hace clic para explorar desde tu computadora. Una vez cargado, vas a poder visualizarlo directamente en la plataforma.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#4D42F3] text-sm font-semibold">
                                2
                            </span>
                            <div>
                                <h4 className="font-semibold">Selecciona el fragmento</h4>
                                <p className="text-sm text-white/80">
                                    Elegi el inicio y el final del fragmento que queres convertir en short. Podes previsualizarlo mientras ajustas el recorte.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#4D42F3] text-sm font-semibold">
                                3
                            </span>
                            <div>
                                <h4 className="font-semibold">Genera el short</h4>
                                <p className="text-sm text-white/80">
                                    Con el fragmento seleccionado, genera tu short automaticamente. El sistema adapta el video a un formato optimizado para redes sociales.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-[#4D42F3] text-sm font-semibold">
                                4
                            </span>
                            <div>
                                <h4 className="font-semibold">Descarga el resultado</h4>
                                <p className="text-sm text-white/80">
                                    Previsualiza el short final y descargalo en HD y sin marca de agua. El archivo queda listo para publicar o reutilizar cuando lo necesites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 sm:px-8 md:px-16 lg:px-24 mt-12 mb-16">
                <div className="bg-[#DEDCFF] rounded-3xl p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Listo para crear tu primer short?
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-600">
                            Subi tu video y empeza a reutilizar tu contenido en minutos.
                        </p>
                        <button className="mt-6 inline-flex items-center gap-2 bg-[#433BFF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-all">
                            Subir video
                        </button>
                    </div>
                    <div className="relative">
                        <img
                            src="/short.jpg" 
                            alt="Vista previa de video" 
                            width={400}
                            height={300}
                            className="w-full h-auto rounded-2xl shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
