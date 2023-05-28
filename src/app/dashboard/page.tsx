import PostForm from "@/components/form/PostForm";
import Http from "@/helper/http";
import type { CategoryType, TopicType, MediaType } from "@/types/cources";
export const metadata = {
  title: "Dashboard",
};
async function getData() {
  const categoryReq = await Http.Get({ path: "category/get" });
  const mediaReq = await Http.Get({ path: "media/get" });
  const topicReq = await Http.Get({ path: "topic/get" });
  const categories = (await categoryReq.json()) as CategoryType[];
  const images = (await mediaReq.json()) as MediaType[];
  const topics = (await topicReq.json()) as TopicType[];
  return { categories, images, topics };
}
export default async function DashBoard() {
  const { categories, images, topics } = await getData();
  return (
    <section className='posts md:mx-8 md:mt-8'>
      <div className='container mx-auto'>
        <div className='posts__heading-wrapper'>
          <h1 className='text-2xl font-bold text-center mb-4'>Cources Form</h1>
        </div>
        <PostForm categories={categories} images={images} topics={topics} />
      </div>
    </section>
  );
}
