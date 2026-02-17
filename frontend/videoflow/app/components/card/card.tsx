import { Clock, Send } from "lucide-react";
export default function Card() {
    return (
        <section className="mx-[50px] md:mx-[100px] lg:mx-[187px] xl:mx-[187px] 2xl:mx-[350px] mt-[60px]">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-[37px] md:gap-[37px] lg:gap-[80px] xl:gap-[150px] max-w-7xl mx-auto">

        <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm
            p-6 md:p-4 lg:p-10
            text-center transition-all duration-700 delay-300
            hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF] 
            ">

            <div className="mx-auto w-14 h-14 md:w-11 md:h-11 lg:w-22 lg:h-22 rounded-full bg-[#E7ECFC] group-hover:bg-[#5e58d4] flex items-center justify-center transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)]">
                <div className="w-10 h-10 md:w-8 md:h-8 lg:w-16 lg:h-16 rounded-full bg-[#CDD8FB] group-hover:bg-white transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)] flex items-center justify-center">
                    <img src="/iconcard1.svg" alt="" className="w-5 h-5 md:w-4 md:h-4 lg:w-[36px] lg:h-[36px]" />
                </div>
            </div>

            <h3 className="mt-4 md:mt-3 lg:mt-6 text-[21px] md:text-[15px] lg:text-[21px] font-bold text-gray-900">
                Rápido
            </h3>
            <p className="mt-2 text-[16px] md:text-[12px] lg:text-base text-gray-700 leading-relaxed">
                Convertí videos en segundos, no en horas. Sin necesidad de edición compleja.
            </p>
        </article>

        <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm
            p-6 md:p-4 lg:p-10
            text-center transition-all duration-700 delay-300
            hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]
            ">

            <div className="mx-auto w-14 h-14 md:w-11 md:h-11 lg:w-22 lg:h-22 rounded-full bg-[#E7ECFC] group-hover:bg-[#5e58d4] flex items-center justify-center transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)]">
                <div className="w-10 h-10 md:w-8 md:h-8 lg:w-16 lg:h-16 rounded-full bg-[#CDD8FB] group-hover:bg-white transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)] flex items-center justify-center">
                    <img src="/iconcard2.svg" alt="" className="w-5 h-5 md:w-4 md:h-4 lg:w-[36px] lg:h-[36px]" />
                </div>
            </div>

            <h3 className="mt-4 md:mt-3 lg:mt-6 text-[21px] md:text-[15px] lg:text-[21px] font-bold text-gray-900">
                Ahorra tiempo
            </h3>
            <p className="mt-2 text-[16px] md:text-[12px] lg:text-base text-gray-700 leading-relaxed">
                Concentrate en tu negocio mientras nosotros nos encargamos de la conversión de video.
            </p>
        </article>

        <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm
            p-6 md:p-4 lg:p-10
            text-center transition-all duration-700 delay-300
            hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]
            ">

            <div className="mx-auto w-14 h-14 md:w-11 md:h-11 lg:w-22 lg:h-22 rounded-full bg-[#E7ECFC] group-hover:bg-[#5e58d4] flex items-center justify-center transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)]">
                <div className="w-10 h-10 md:w-8 md:h-8 lg:w-16 lg:h-16 rounded-full bg-[#CDD8FB] group-hover:bg-white transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)] flex items-center justify-center">
                    <img src="/iconcard3.svg" alt="" className="w-5 h-5 md:w-4 md:h-4 lg:w-[36px] lg:h-[36px]" />
                </div>
            </div>

            <h3 className="mt-4 md:mt-3 lg:mt-6 text-[21px] md:text-[15px] lg:text-[21px] font-bold text-gray-900">
                Listo para publicar
            </h3>
            <p className="mt-2 text-[16px] md:text-[12px] lg:text-base text-gray-700 leading-relaxed">
                Exportá en el formato perfecto para todas las principales plataformas sociales.
            </p>
        </article>

    </div>
</section>
    );
}
