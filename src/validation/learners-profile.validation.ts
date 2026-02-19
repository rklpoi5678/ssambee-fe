import { z } from "zod";

export const learnersProfileUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요")
    .min(2, "이름은 최소 2자 이상이어야 합니다"),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  school: z.string().trim().optional(),
  schoolYear: z.string().trim().optional(),
});

export type LearnersProfileUpdateFormData = z.infer<
  typeof learnersProfileUpdateSchema
>;
