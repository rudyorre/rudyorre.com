import { badges } from "@/constants/badges";

export const generate = (name: string) => {
    if (badges.has(name.toLowerCase())) {
        return badges.get(name);
    }
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return `https://img.shields.io/badge/${name}-%23FFFFFF.svg?style=flat`;
}