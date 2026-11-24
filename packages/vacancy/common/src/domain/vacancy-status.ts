import { z } from "zod";

export const VacancyStatus = z
  .enum({
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
  })
  .meta({
    id: "VacancyStatus",
  });

export type VacancyStatus = z.infer<typeof VacancyStatus>;
