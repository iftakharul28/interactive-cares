import Http from "@/helper/http";
import type { CourseType, Options, CategoryType, MediaType, TopicType } from "@/types/cources";
import CourseDetails from "@/components/course/CourseDetails";
interface Course extends CourseType {
  slug: Options;
  category: CategoryType;
  media: MediaType;
  topic: TopicType[];
  user: {
    id: number;
    name: string;
  };
}
async function getData(slug: string): Promise<Course> {
  const res = await Http.Get({
    path: `course/show?slug=${slug}`,
  });
  return await res.json();
}
export default async function CourseSingle({ params }: { params: { courseId: string } }) {
  const data = await getData(params.courseId);
  return (
    <section className='course-single'>
      <CourseDetails course={data} />
    </section>
  );
}
