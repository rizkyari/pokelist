import Image from "next/image";
import { capitalize, getSpriteUrl } from "@/lib/pokemon";

type Props = {id: string | number; name: string};

export default function PokemonCard({ id, name}: Props) {
    const img = getSpriteUrl(id);
    return (
        <div className="bg-white rounded-xl shadow p-4 text-center transition duration-200 hover:shadow-lg focus-within:shadow-lg hover:-translate-y-0.5">
            <Image
            src={img}
            alt={name}
            width={96}
            height={96}
            className="mx-auto"
            />
            <p className="mt-2 font-medium capitalize">{capitalize(name)}</p>
        </div>
    );
}