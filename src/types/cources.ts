export type CourseType = {
  id: number;
  title: string;
  type: string;
  review_rate: number;
  lessons: number;
  length: string;
  price: number;
  oldPrice: number;
  published: boolean;
};
export type CourseFormType = {
  title?: string;
  type?: string;
  lessons?: number;
  length?: number;
  price?: number;
  oldPrice?: number;
  published?: boolean;
};
export type Options = {
  id?: number;
  title: string;
};
export interface CategoryType extends Options {
  slug: string;
}
export type SlugType = Options;
export type MediaType = CategoryType;

export interface TopicType extends CategoryType {
  type: "youtube" | "";
  durations: string;
  video_id: string;
}
