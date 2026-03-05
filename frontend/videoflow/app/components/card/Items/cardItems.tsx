import { ReactNode } from "react";
import CardIcon1 from "../../UI/icons/Card1-Icon";
import CardIcon2 from "../../UI/icons/Card2-Icon";
import CardIcon3 from "../../UI/icons/Card3-Icon";

export type CardType = {
    id: number;
    icon: ReactNode;
    title: string;
    description: string;
};

export const cards: CardType[] = [
    {
        id: 1,
        icon: <CardIcon1 />,
        title: "Rápido",
        description:
            "Convertí videos en segundos, no en horas. Sin necesidad de edición compleja.",
    },
    {
        id: 2,
        icon: <CardIcon2 />,
        title: "Ahorra tiempo",
        description:
            "Concentrate en tu negocio mientras nosotros nos encargamos de la conversión de video.",
    },
    {
        id: 3,
        icon: <CardIcon3 />,
        title: "Listo para publicar",
        description:
            "Descargá en el formato perfecto para todas las principales plataformas sociales.",
    },
];

type CardItemProps = Omit<CardType, "id">;

export function CardItem({ icon, title, description }: CardItemProps) {
    return (
        <article className="group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all delay-300 duration-700 hover:translate-y-2 hover:bg-[#DEDCFF] hover:shadow-[0_4px_6px_-2px_rgba(92,66,184,0.5)] md:p-4 lg:p-6 xl:p-10 2xl:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7ECFC] shadow-[0_6px_14px_rgba(165,160,255,0.35)] transition-all delay-300 duration-700 group-hover:bg-[#5e58d4] md:h-11 md:w-11 lg:h-14 lg:w-14 xl:h-22 xl:w-22 2xl:h-16 2xl:w-16">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CDD8FB] shadow-[0_6px_14px_rgba(165,160,255,0.35)] transition-all delay-300 duration-700 group-hover:bg-white md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-16 xl:w-16 2xl:h-12 2xl:w-12">
                    {icon}
                </div>
            </div>

            <h3 className="mt-4 text-[21px] font-bold text-gray-900 md:mt-3 md:text-[15px] lg:mt-4 lg:text-[16px] xl:mt-6 xl:text-[21px] 2xl:mt-4 2xl:text-[18px]">
                {title}
            </h3>

            <p className="mt-2 text-[16px] leading-relaxed text-gray-700 md:text-[12px] lg:text-[13px] xl:text-base 2xl:text-[14px]">
                {description}
            </p>
        </article>
    );
}
