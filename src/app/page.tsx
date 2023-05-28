import CourseList from "@/components/course/CourseList";
import Http from "@/helper/http";
import type { CategoryType, CourseType, MediaType, Options } from "@/types/cources";
interface Course extends CourseType {
  slug: Options;
  category: CategoryType;
  media: MediaType;
  user: {
    id: number;
    name: string;
  };
}
async function getData() {
  const courseReq = await Http.Get({ path: "course/get" });
  const categoryReq = await Http.Get({ path: "category/get" });
  const course = (await courseReq.json()) as Course[];
  const category = (await categoryReq.json()) as CategoryType[];
  return { course, category };
}
export default async function Home() {
  const { course, category } = await getData();
  return (
    <main className='container '>
      <h1 className='home__heading'>courses</h1>
      <section className='home__courses'>
        <p className='home__text'>All Courses You Can Filter</p>
        <CourseList course={course} category={category} />
      </section>
    </main>
  );
}
