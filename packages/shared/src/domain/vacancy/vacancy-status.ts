import { z } from "zod";

export const VACANCY_STATUS = {
  NEW: "new",
  HIDDEN: "hidden",
  APPLIED: "applied",
  SCREENING_PASSED: "screening_passed",
  INTERVIEW_PASSED: "interview_passed",
  OFFER: "offer",
  REJECTED: "rejected",
  ACCEPTED: "accepted",
  OFFER_DECLINED: "offer_declined",
  OFFER_REVOKED: "offer_revoked",
} as const;

export type VacancyStatus = (typeof VACANCY_STATUS)[keyof typeof VACANCY_STATUS];

export const vacancyStatusSchema = z.enum(VACANCY_STATUS).meta({ id: "VacancyStatus" });
