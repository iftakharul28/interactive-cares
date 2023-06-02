"use client";
import { useState } from "react";
import DropDown from "@/components/dropdown/DropDown";
import TopicDropDown from "@/components/dropdown/TopicDropDown";
import { useDebouncedCallback } from "use-debounce";
import type { CourseFormType, CategoryType, TopicType, MediaType } from "@/types/cources";
import Http from "@/helper/http";

interface Course extends CourseFormType {
  slug?: string;
}
type Props = {
  categories: CategoryType[];
  images: MediaType[];
  topics: TopicType[];
};
const PostForm = ({ categories, images, topics }: Props) => {
  const [cource, setCource] = useState<Course | null>({
    title: "",
    slug: "",
    type: "",
    lessons: 0,
    length: "",
    price: 0,
    oldPrice: 0,
    published: false,
  });
  const [category, setCategory] = useState<CategoryType>();
  const [media, setMedia] = useState<MediaType>();
  const [topic, setTopic] = useState<TopicType[]>([]);
  const debouncedSlug = useDebouncedCallback((value: string) => {
    if (!value) {
      setCource({ slug: "" });
    } else {
      setCource({
        ...cource,
        slug: value
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
          .toLowerCase(),
      });
    }
  }, 1000);
  const addPost = async (postData: unknown) => {
    console.log(postData);
    try {
      const data = await Http.Post({
        path: "course/post",
        data: postData,
      });
      if (data.status === 201) {
        setCource({
          title: "",
          slug: "",
          length: "",
          price: 0,
          oldPrice: 0,
          published: false,
        });
        setCategory({
          title: "",
          slug: "",
        });
        setMedia({
          title: "",
          slug: "",
        });
        setTopic([]);
      } else {
        const content = await data.json();
        console.log(content);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className='form login__card-body' role='form'>
      <div className='form__row'>
        <div className='form__input-group mb-3'>
          <label htmlFor='title' className='sr-only'>
            Title
          </label>
          <input
            id='title'
            type='text'
            className='form__input py-3 px-5'
            placeholder='cource Title'
            required
            onChange={(e) => {
              debouncedSlug(e.target.value);
              setCource({ ...cource, title: e.target.value });
            }}
            value={cource?.title ? cource?.title : ""}
          />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__input-group mb-3'>
          <label htmlFor='slug' className='sr-only'>
            Slug
          </label>
          <input
            id='slug'
            type='text'
            className='form__input py-3 px-5'
            placeholder='cource Slug'
            required
            onChange={(e) => setCource({ ...cource, slug: e.target.value })}
            value={cource?.slug ? cource?.slug : ""}
          />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__input-group mb-3'>
          <label htmlFor='lessons' className='sr-only'>
            Lessons
          </label>
          <input
            className='form__input py-3 px-5'
            type='number'
            name='lessons'
            placeholder='cource Lessons'
            id='lessons'
            required
            onChange={(e) => setCource({ ...cource, lessons: Number(e.target.value) })}
            value={cource?.lessons ? cource?.lessons : ""}
          />
        </div>
        <div className='form__input-group mb-3'>
          <label htmlFor='length' className='sr-only'>
            length
          </label>
          <input
            className='form__input py-3 px-5'
            type='text'
            name='length'
            placeholder='Cource length'
            id='length'
            required
            onChange={(e) => setCource({ ...cource, length: e.target.value })}
            value={cource?.length ? cource?.length : ""}
          />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__input-group mb-3'>
          <label htmlFor='price' className='sr-only'>
            Price
          </label>
          <input
            className='form__input py-3 px-5'
            type='number'
            name='price'
            placeholder='cource Price'
            id='price'
            required
            onChange={(e) => setCource({ ...cource, price: Number(e.target.value) })}
            value={cource?.price ? cource?.price : ""}
          />
        </div>
        <div className='form__input-group mb-3'>
          <label htmlFor='discountPrice' className='sr-only'>
            Discount Price
          </label>
          <input
            className='form__input py-3 px-5'
            type='number'
            name='discountPricee'
            placeholder='Discount cource Price'
            id='discountPrice'
            required
            onChange={(e) => setCource({ ...cource, oldPrice: Number(e.target.value) })}
            value={cource?.oldPrice ? cource?.oldPrice : ""}
          />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__input-group mb-3'>
          <label htmlFor='image' className='sr-only'>
            Type
          </label>
          <input
            className='form__input py-3 px-5'
            type='text'
            name='type'
            placeholder='cource Type'
            id='image'
            required
            onChange={(e) => setCource({ ...cource, type: e.target.value })}
            value={cource?.type ? cource?.type : ""}
          />
        </div>
        <div className='form__input-group mb-3'>
          <label htmlFor='category' className='sr-only'>
            Topic
          </label>
          <TopicDropDown placeHolder='Search' multiple isSearchable options={topics} value={topic} onChange={(value) => setTopic(value)} />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__input-group mb-3'>
          <label htmlFor='category' className='sr-only'>
            Media
          </label>
          <DropDown options={images} placeHolder='Search' isSearchable value={media} onChange={(value) => setMedia(value)} />
        </div>
        <div className='form__input-group mb-3'>
          <label htmlFor='category' className='sr-only'>
            Category
          </label>
          <DropDown options={categories} placeHolder='Search' isSearchable value={category} onChange={(category) => setCategory(category)} />
        </div>
      </div>
      <button
        type='button'
        className='form__button'
        onClick={() =>
          addPost({
            ...cource,
            category,
            media,
            topic,
          })
        }>
        post
      </button>
    </form>
  );
};

export default PostForm;
