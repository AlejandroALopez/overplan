import { StaticImport } from "next/dist/shared/lib/get-img-props";
import BlueBadge from "../../../public/badges/blueBadge.svg";
import GreenBadge from "../../../public/badges/greenBadge.svg";
import RedBadge from "../../../public/badges/redBadge.svg";
import PurpleBadge from "../../../public/badges/purpleBadge.svg";

// For selecting different SVGs of badges
interface IBadgeSelector {
  [key: string]: StaticImport;
}

// Chooses the color of a new badge based on the plan's numWeeks value
export const badgeColorPicker = (numWeeks: number) => {
  let badgeColor: string;

  switch (numWeeks) {
    case 1:
    case 2:
    case 3:
      badgeColor = "blue";
      break;
    case 4:
    case 5:
    case 6:
      badgeColor = "green";
      break;
    case 7:
    case 8:
    case 9:
      badgeColor = "red";
      break;
    default: // 10+
      badgeColor = "purple";
      break;
  }

  return badgeColor;
};

// Maps badge color string to SVG
export const badgeSelector: IBadgeSelector = {
  "blue": BlueBadge,
  "green": GreenBadge,
  "red": RedBadge,
  "purple": PurpleBadge,
};
