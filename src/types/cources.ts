import * as z from "zod";
export const CourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
  review_rate: z.number(),
  lessons: z.number(),
  length: z.string(),
  price: z.number(),
  oldPrice: z.number(),
  published: z.boolean(),
});
export const CourseFormSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  lessons: z.number().optional(),
  length: z.string().optional(),
  price: z.number().optional(),
  oldPrice: z.number().optional(),
  published: z.boolean().optional(),
});

export const OptionsSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
});

export const CategorySchema = OptionsSchema.extend({
  slug: z.string(),
});

export type CourseFormType = z.infer<typeof CourseFormSchema>;
export type CourseType = z.infer<typeof CourseSchema>;
export type Options = z.infer<typeof OptionsSchema>;
export type CategoryType = z.infer<typeof CategorySchema>;

export type SlugType = Options;
export type MediaType = CategoryType;

export interface TopicType extends CategoryType {
  type: "youtube" | "";
  durations: string;
  video_id: string;
}
