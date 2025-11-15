// Plan 基本型別
export type Trip = {
  id: string;
  userId: string;
  title: string;
  destination: string | null;
  startDate: string;
  startTimezone: string;
  endDate: string;
  endTimezone: string;
  note: string | null;
  coverImage: string | null;
  isDeleted: number;
  createdAt: string;
  updatedAt: string;
};

export interface TripForUI extends Trip {
  status: string;
  displayStartDate: string;
  displayEndDate: string;
}
