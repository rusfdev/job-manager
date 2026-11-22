import { VacancyStatus, VacancyTransition } from "@repo/vacancy-shared/domain";

const STATUS = VacancyStatus.enum;
const TRANSITION = VacancyTransition.enum;

export type VacancyTransitionRule = {
  readonly from: readonly VacancyStatus[];
  readonly to: VacancyStatus;
};

export const VACANCY_TRANSITION_RULES = {
  [TRANSITION.APPLY]: {
    from: [STATUS.NEW, STATUS.HIDDEN],
    to: STATUS.APPLIED,
  },
  [TRANSITION.HIDE]: {
    from: [STATUS.NEW],
    to: STATUS.HIDDEN,
  },
  [TRANSITION.PASS_SCREENING]: {
    from: [STATUS.APPLIED],
    to: STATUS.SCREENING_PASSED,
  },
  [TRANSITION.PASS_INTERVIEW]: {
    from: [STATUS.APPLIED, STATUS.SCREENING_PASSED],
    to: STATUS.INTERVIEW_PASSED,
  },
  [TRANSITION.MARK_REJECTED]: {
    from: [STATUS.APPLIED, STATUS.SCREENING_PASSED, STATUS.INTERVIEW_PASSED],
    to: STATUS.REJECTED,
  },
  [TRANSITION.RECEIVE_OFFER]: {
    from: [STATUS.INTERVIEW_PASSED],
    to: STATUS.OFFER,
  },
  [TRANSITION.ACCEPT_OFFER]: {
    from: [STATUS.OFFER],
    to: STATUS.ACCEPTED,
  },
  [TRANSITION.DECLINE_OFFER]: {
    from: [STATUS.OFFER],
    to: STATUS.OFFER_DECLINED,
  },
  [TRANSITION.REVOKE_OFFER]: {
    from: [STATUS.OFFER],
    to: STATUS.OFFER_REVOKED,
  },
} as const satisfies Record<VacancyTransition, VacancyTransitionRule>;
