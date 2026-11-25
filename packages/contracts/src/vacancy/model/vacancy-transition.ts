import { z } from "zod";

export const VacancyTransition = z
  .enum({
    APPLY: "apply",
    HIDE: "hide",
    PASS_SCREENING: "pass_screening",
    PASS_INTERVIEW: "pass_interview",
    MARK_REJECTED: "mark_rejected",
    RECEIVE_OFFER: "receive_offer",
    ACCEPT_OFFER: "accept_offer",
    DECLINE_OFFER: "decline_offer",
    REVOKE_OFFER: "revoke_offer",
  })
  .meta({
    id: "VacancyTransition",
  });

export type VacancyTransition = z.infer<typeof VacancyTransition>;
