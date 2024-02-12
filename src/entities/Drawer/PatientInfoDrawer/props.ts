import type { LegsResultsModel } from "@/shared/rtkApi/models/exercise";

export interface PatientInfoDrawerProps {
  open: boolean;
  onClose: () => void;
  data?: LegsResultsModel[];
}
