import { Suspense } from "react";
import Download from "../components/Download/download";

export default function Page() {
    return (
        <Suspense fallback={<p className="mt-20 text-center">Cargando...</p>}>
            <Download />
        </Suspense>
    );
}
