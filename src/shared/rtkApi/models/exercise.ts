export interface LegsResultsModel {
  leg_type: "LEFT" | "RIGHT" | "BOTH";
  sets: {
    bendingDegreeAvg: number;
    bendingDegreeMax: number;
    dayTime: string;
    repetitions: string;
  }[];
}

export interface ExerciseResultsModel {
  exercise_name: string;
  date: string;
  sets_num: number;
  ben_deg_daily_avg: number;
  ben_deg_daily_max: number;
  leg: LegsResultsModel[];
}
