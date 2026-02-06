export default function Style() {
    return (
        <section className=" absolute top-6 right-2 sm:top-8 sm:right-6 md:top-12 md:right-28 w-56 h-48 sm:w-64 sm:h-56 md:w-72 md:h-64 lg:w-82 lg:h-72 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-violet-500/20 rounded-xl opacity-0 animate-in" />

            <div className="absolute bottom-4 right-20 sm:bottom-6 sm:right-20 md:bottom-8 md:right-24 lg:bottom-8 lg:right-32 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22.5 lg:h-22.5 bg-violet-500/40 rounded-xl opacity-0 animate-in-delay" />
        </section>
    );
}
