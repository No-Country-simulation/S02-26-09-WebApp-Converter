import { Clock, Send, Zap, Upload } from "lucide-react";
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <article className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center transition-all duration-1000 delay-300 hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">
                        <div className="mx-auto w-20 h-20 rounded-full bg-[#A5A0FF] flex items-center justify-center">
                            <Zap className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-gray-900">
                            Rápido
                        </h3>
                        <p className="mt-4 text-base text-gray-700 leading-relaxed">
                            Convertí videos en segundos, no en horas. Sin necesidad de edición compleja.
                        </p>
                    </article>

                    <article className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center transition-all duration-1000 delay-300 hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">
                        <div className="mx-auto w-20 h-20 rounded-full bg-[#E8E7FF] flex items-center justify-center">
                            <Clock className="w-10 h-10 text-[#5C4CE8]" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-gray-900">
                            Ahorra tiempo
                        </h3>
                        <p className="mt-4 text-base text-gray-700 leading-relaxed">
                            Concentrate en tu negocio mientras nosotros nos encargamos de la conversión de video.
                        </p>
                    </article>

                    <article className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center transition-all duration-1000 delay-300 hover:translate-y-2  hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">
                        <div className="mx-auto w-20 h-20 rounded-full bg-[#E8E7FF] flex items-center justify-center">
                            <Send className="w-10 h-10 text-[#5C4CE8]" />
                        </div>
                        <h3 className="mt-6 text-2xl font-bold text-gray-900">
                            Listo para publicar
                        </h3>
                        <p className="mt-4 text-base text-gray-700 leading-relaxed">
                            Exportá en el formato perfecto para todas las principales plataformas sociales.
                        </p>
                    </article>
                </div>
            </section>

            <section className="px-4 sm:px-8 md:px-16 lg:px-24 mt-24 mb-24">
                <div className="bg-[#433BFF] rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 text-white">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
                        ¿Cómo funciona?
                    </h2>
                    <div className="mt-8 space-y-8">
                        <div className="flex items-start gap-6">
                            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#433BFF] text-xl font-bold flex-shrink-0">
                                1
                            </span>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Subí tu video</h4>
                                <p className="text-base text-white/90 leading-relaxed">
                                    Hacé clic para explorarlo desde tu computadora. Una vez cargado, vas a poder visualizarlo directamente en la plataforma.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#433BFF] text-xl font-bold flex-shrink-0">
                                2
                            </span>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Seleccioná el fragmento</h4>
                                <p className="text-base text-white/90 leading-relaxed">
                                    Elegí el inicio y el final del fragmento que querés convertir en short. Podés previsualizar el contenido mientras ajustás el recorte para asegurarte de que el resultado sea exactamente el que necesitás.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#433BFF] text-xl font-bold flex-shrink-0">
                                3
                            </span>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Generá el short</h4>
                                <p className="text-base text-white/90 leading-relaxed">
                                    Con el fragmento seleccionado, generá tu short automáticamente. El sistema adapta el video a un formato optimizado para redes sociales, manteniendo una buena calidad visual.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#433BFF] text-xl font-bold flex-shrink-0">
                                4
                            </span>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Descargá el resultado</h4>
                                <p className="text-base text-white/90 leading-relaxed">
                                    Previsualizá el short final y descargalo en HD y sin marca de agua. El archivo queda listo para publicar o reutilizar cuando lo necesites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#DEDCFF] mt-12 mb-16">
                <div className="px-4 sm:px-8 md:px-16 lg:px-24 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="ml-0 sm:ml-4 md:ml-8 lg:ml-40">
                        <h2 className="text-[41px] sm:text-5xl md:text-6xl font-bold text-black leading-tight">
                            Listo para crear tu primer short?
                        </h2>
                        <p className="mt-6 text-base sm:text-[33px] text-gray-700">
                            Subí tu video y empezá a reutilizar tu contenido en minutos.
                        </p>
                        <button className="mt-6 inline-flex items-center gap-2 bg-[#433BFF] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-800 transition-all">
                            <Upload className="w-5 h-5" />
                            Subir video
                        </button>
                    </div>
                    <div className="relative mr-0 sm:mr-4 md:mr-8 lg:mr-40">
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
