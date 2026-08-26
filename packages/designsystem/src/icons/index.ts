export { IconByggeEndre } from "./IconByggeEndre";
export { IconByggevarer } from "./IconByggevarer";
export { IconByggteknisk } from "./IconByggteknisk";
export { IconForskriftSak } from "./IconForskriftSak";
export { IconForskriftTek } from "./IconForskriftTek";
export { IconForskrift } from "./IconForskrift";
export { IconNabovarsel } from "./IconNabovarsel";
export { IconPekerGronn } from "./IconPekerGronn";
export { IconSentralGodkjenning } from "./IconSentralGodkjenning";
export { IconSentraltgodkjent } from "./IconSentraltgodkjent";
export { IconSkjemaOgSoknadslosninger } from "./IconSkjemaOgSoknadslosninger";
export { IconSkjema } from "./IconSkjema";
export { IconTilsyn } from "./IconTilsyn";

import type { SVGProps, FunctionComponent } from "react";
import { IconByggeEndre } from "./IconByggeEndre";
import { IconByggevarer } from "./IconByggevarer";
import { IconByggteknisk } from "./IconByggteknisk";
import { IconForskriftSak } from "./IconForskriftSak";
import { IconForskriftTek } from "./IconForskriftTek";
import { IconForskrift } from "./IconForskrift";
import { IconNabovarsel } from "./IconNabovarsel";
import { IconPekerGronn } from "./IconPekerGronn";
import { IconSentralGodkjenning } from "./IconSentralGodkjenning";
import { IconSentraltgodkjent } from "./IconSentraltgodkjent";
import { IconSkjemaOgSoknadslosninger } from "./IconSkjemaOgSoknadslosninger";
import { IconSkjema } from "./IconSkjema";
import { IconTilsyn } from "./IconTilsyn";

export type DibkIconName =
  | "bygge-endre"
  | "byggevarer"
  | "byggteknisk"
  | "forskrift-sak"
  | "forskrift-tek"
  | "forskrift"
  | "nabovarsel"
  | "peker-gronn"
  | "sentral-godkjenning"
  | "sentraltgodkjent"
  | "skjema-og-soknadslosninger"
  | "skjema"
  | "tilsyn";

export const dibkIcons: Record<DibkIconName, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  "bygge-endre": IconByggeEndre,
  "byggevarer": IconByggevarer,
  "byggteknisk": IconByggteknisk,
  "forskrift-sak": IconForskriftSak,
  "forskrift-tek": IconForskriftTek,
  "forskrift": IconForskrift,
  "nabovarsel": IconNabovarsel,
  "peker-gronn": IconPekerGronn,
  "sentral-godkjenning": IconSentralGodkjenning,
  "sentraltgodkjent": IconSentraltgodkjent,
  "skjema-og-soknadslosninger": IconSkjemaOgSoknadslosninger,
  "skjema": IconSkjema,
  "tilsyn": IconTilsyn,
};
