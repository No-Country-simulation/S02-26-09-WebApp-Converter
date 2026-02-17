import { Clock, Send } from "lucide-react";
export default function Card() {
    return (
        <section className="mx-[50px] md:mx-[100px] lg:mx-[187px] xl:mx-[187px] 2xl:mx-[350px] mt-[80px]">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-[37px] md:gap-[37px] lg:gap-[24px] xl:gap-[80px] 2xl:gap-[40px] max-w-7xl mx-auto">

        <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm
            p-6 md:p-4 lg:p-6 xl:p-10 2xl:p-8
            text-center transition-all duration-700 delay-300
            hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">

            <div className="mx-auto w-14 h-14 md:w-11 md:h-11 lg:w-14 lg:h-14 xl:w-22 xl:h-22 2xl:w-16 2xl:h-16 rounded-full bg-[#E7ECFC] group-hover:bg-[#5e58d4] flex items-center justify-center transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)]">
                <div className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-16 xl:h-16 2xl:w-12 2xl:h-12 rounded-full bg-[#CDD8FB] group-hover:bg-white transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)] flex items-center justify-center">
                    <img src="/iconcard1.svg" alt="" className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-[36px] xl:h-[36px] 2xl:w-[28px] 2xl:h-[28px]" />
                </div>
            </div>

            <h3 className="mt-4 md:mt-3 lg:mt-4 xl:mt-6 2xl:mt-4 text-[21px] md:text-[15px] lg:text-[16px] xl:text-[21px] 2xl:text-[18px] font-bold text-gray-900">
                Rápido
            </h3>
            <p className="mt-2 text-[16px] md:text-[12px] lg:text-[13px] xl:text-base 2xl:text-[14px] text-gray-700 leading-relaxed">
                Convertí videos en segundos, no en horas. Sin necesidad de edición compleja.
            </p>
        </article>

        <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm
            p-6 md:p-4 lg:p-6 xl:p-10 2xl:p-8
            text-center transition-all duration-700 delay-300
            hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">

            <div className="mx-auto w-14 h-14 md:w-11 md:h-11 lg:w-14 lg:h-14 xl:w-22 xl:h-22 2xl:w-16 2xl:h-16 rounded-full bg-[#E7ECFC] group-hover:bg-[#5e58d4] flex items-center justify-center transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)]">
                <div className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-16 xl:h-16 2xl:w-12 2xl:h-12 rounded-full bg-[#CDD8FB] group-hover:bg-white transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)] flex items-center justify-center">
                    <img src="/iconcard2.svg" alt="" className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-[36px] xl:h-[36px] 2xl:w-[28px] 2xl:h-[28px]" />
                </div>
            </div>

            <h3 className="mt-4 md:mt-3 lg:mt-4 xl:mt-6 2xl:mt-4 text-[21px] md:text-[15px] lg:text-[16px] xl:text-[21px] 2xl:text-[18px] font-bold text-gray-900">
                Ahorra tiempo
            </h3>
            <p className="mt-2 text-[16px] md:text-[12px] lg:text-[13px] xl:text-base 2xl:text-[14px] text-gray-700 leading-relaxed">
                Concentrate en tu negocio mientras nosotros nos encargamos de la conversión de video.
            </p>
        </article>

        <article className="group bg-white rounded-2xl border border-gray-200 shadow-sm
            p-6 md:p-4 lg:p-6 xl:p-10 2xl:p-8
            text-center transition-all duration-700 delay-300
            hover:translate-y-2 hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] hover:bg-[#DEDCFF]">

            <div className="mx-auto w-14 h-14 md:w-11 md:h-11 lg:w-14 lg:h-14 xl:w-22 xl:h-22 2xl:w-16 2xl:h-16 rounded-full bg-[#E7ECFC] group-hover:bg-[#5e58d4] flex items-center justify-center transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)]">
                <div className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-16 xl:h-16 2xl:w-12 2xl:h-12 rounded-full bg-[#CDD8FB] group-hover:bg-white transition-all duration-700 delay-300 shadow-[0_6px_14px_rgba(165,160,255,0.35)] flex items-center justify-center">
                    <img src="/iconcard3.svg" alt="" className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-[36px] xl:h-[36px] 2xl:w-[28px] 2xl:h-[28px]" />
                </div>
            </div>

            <h3 className="mt-4 md:mt-3 lg:mt-4 xl:mt-6 2xl:mt-4 text-[21px] md:text-[15px] lg:text-[16px] xl:text-[21px] 2xl:text-[18px] font-bold text-gray-900">
                Listo para publicar
            </h3>
            <p className="mt-2 text-[16px] md:text-[12px] lg:text-[13px] xl:text-base 2xl:text-[14px] text-gray-700 leading-relaxed">
                Exportá en el formato perfecto para todas las principales plataformas sociales.
            </p>
        </article>

    </div>
</section>
    );
}
