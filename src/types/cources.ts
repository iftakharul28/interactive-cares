export type CourseType = {
  id: number;
  title: string;
  type: string;
  review_rate: number;
  lessons: number;
  length: number;
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
  url: string;
};
export interface CategoryType extends Options {
  title: string;
}
export type SlugType = Options;
export type TopicType = CategoryType;
export type MediaType = CategoryType;

export interface videoType extends CategoryType {
  type: string;
}
