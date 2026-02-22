export default function AppInstructions() {
    return (
        <section className="mt-[90px] mb-[77px] mx-[50px] md:mx-[100px] lg:mx-[187px] xl:mx-[187px] 2xl:mx-[350px] ">
    <div className="bg-[#433BFF] rounded-3xl p-[20px] sm:p-[25px] md:p-[30px] lg:p-[40px] 2xl:p-[45px] text-white">
        
        <h2 className="text-[27px] sm:text-[27px] md:text-[33px] lg:text-[41px] font-bold mb-6 md:mb-8">
            ¿Cómo funciona?
        </h2>

        <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">

            {/* Item 1 */}
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="flex items-center gap-3 md:gap-0">
                    <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#2F27CE] text-white text-base text-[21px] font-bold shrink-0">
                        1
                    </span>
                    <h4 className="text-base text-[21px] font-bold md:hidden ml-1">
                        Subí tu video
                    </h4>
                </div>
                <div>
                    <h4 className="hidden md:block text-[21px] font-bold mb-2">
                        Subí tu video
                    </h4>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed text-[14px] sm:text-[17px]">
                        Hacé clic para explorarlo desde tu computadora. Una vez cargado, vas a poder visualizarlo directamente en la plataforma.
                    </p>
                </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="flex items-center gap-3 md:gap-0">
                    <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#2F27CE] text-white text-base text-[21px] font-bold shrink-0">
                        2
                    </span>
                    <h4 className="text-base text-[21px] font-bold md:hidden ml-1">
                        Seleccioná el fragmento
                    </h4>
                </div>
                <div>
                    <h4 className="hidden md:block text-[21px] font-bold mb-2">
                        Seleccioná el fragmento
                    </h4>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed text-[14px] sm:text-[17px]">
                        Elegí el inicio y el final del fragmento que querés convertir en short. Podés previsualizar el contenido mientras ajustás el recorte para asegurarte de que el resultado sea exactamente el que necesitás.
                    </p>
                </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="flex items-center gap-3 md:gap-0">
                    <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#2F27CE] text-white text-base text-[21px] font-bold shrink-0">
                        3
                    </span>
                    <h4 className="text-base text-[21px] font-bold md:hidden ml-1">
                        Generá el short
                    </h4>
                </div>
                <div>
                    <h4 className="hidden md:block text-[21px] font-bold mb-2">
                        Generá el short
                    </h4>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed text-[14px] sm:text-[17px]">
                        Con el fragmento seleccionado, generá tu short automáticamente. El sistema adapta el video a un formato optimizado para redes sociales, manteniendo una buena calidad visual.
                    </p>
                </div>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                <div className="flex items-center gap-3 md:gap-0">
                    <span className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#2F27CE] text-white text-base text-[21px] font-bold shrink-0">
                        4
                    </span>
                    <h4 className="text-base text-[21px] font-bold md:hidden ml-1">
                        Descargá el resultado
                    </h4>
                </div>
                <div>
                    <h4 className="hidden md:block text-[21px] font-bold mb-2">
                        Descargá el resultado
                    </h4>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed text-[14px] sm:text-[17px]">
                        Previsualizá el short final y descargalo en HD y sin marca de agua. El archivo queda listo para publicar o reutilizar cuando lo necesites.
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>
    );
}