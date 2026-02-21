import { CardItem, cards } from "./Items/cardItems";

export default function Card() {
    return (
        <section className="mx-[50px] md:mx-[100px] lg:mx-[187px] xl:mx-[187px] 2xl:mx-[350px] mt-[80px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[37px] md:gap-[37px] lg:gap-[24px] xl:gap-[80px] 2xl:gap-[40px] max-w-7xl mx-auto">
                {cards.map(({ id, ...rest }) => (
                    <CardItem key={id} {...rest} />
                ))}
            </div>
        </section>
    );
}
