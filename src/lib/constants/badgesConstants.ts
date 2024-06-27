import { StaticImport } from "next/dist/shared/lib/get-img-props";
import BlueBadge from "../../../public/badges/blueBadge.svg";
import GreenBadge from "../../../public/badges/greenBadge.svg";
import RedBadge from "../../../public/badges/redBadge.svg";
import PurpleBadge from "../../../public/badges/purpleBadge.svg";

// For selecting different SVGs of badges
interface IBadgeSelector {
    [key: string]: StaticImport
}

export const badgeSelector: IBadgeSelector = {
    'blue': BlueBadge,
    'green': GreenBadge,
    'red': RedBadge,
    'purple': PurpleBadge,
}