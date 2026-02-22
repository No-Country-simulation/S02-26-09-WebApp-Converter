export default function Style() {
    return (
        <section className="relative w-32 h-44 sm:w-44 sm:h-56 md:w-50 md:h-64 lg:w-82 lg:h-105 shrink-0">
            <div className="absolute z-10 top-0 right-0 w-28 h-38 sm:w-36 sm:h-46 md:w-40 md:h-52 lg:w-67 lg:h-93 rounded-xl lg:rounded-[30px] opacity-0 animate-in bg-[#DEDCFF] bg-[url('/Bg-card.png')] bg-cover bg-top bg-no-repeat" />

            <div className="absolute bottom-2 -left-2 sm:bottom-4 sm:-left-4 md:bottom-4 md:-left-4 lg:bottom-0 lg:-left-6 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-35 lg:h-35 bg-[#433BFF66] rounded-xl opacity-0 animate-in-delay" />
        </section>
    );
}
