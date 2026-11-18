import { z } from "zod";

export const VACANCY_TRANSITION = {
  APPLY: "apply",
  HIDE: "hide",
  PASS_SCREENING: "pass_screening",
  PASS_INTERVIEW: "pass_interview",
  MARK_REJECTED: "mark_rejected",
  RECEIVE_OFFER: "receive_offer",
  ACCEPT_OFFER: "accept_offer",
  DECLINE_OFFER: "decline_offer",
  REVOKE_OFFER: "revoke_offer",
} as const;

export type VacancyTransition = (typeof VACANCY_TRANSITION)[keyof typeof VACANCY_TRANSITION];

export const vacancyTransitionSchema = z.enum(VACANCY_TRANSITION).meta({ id: "VacancyTransition" });
