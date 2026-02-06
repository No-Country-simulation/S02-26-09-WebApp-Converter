import Logo from "../UI/logo";

export default function Header() {
    return (
        <header className="w-full h-20 flex items-center justify-between border-b border-[#DEDCFF] py-5 px-4 sm:px-8 lg:px-20">
            <Logo />

            <h3 className="font-inter font-normal text-sm text-[#797979]">
                De video a short
            </h3>
        </header>
    );
}
