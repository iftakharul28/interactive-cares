import VideoPlayer from "@/components/video/VideoPlayer";
import Http from "@/helper/http";
import courses from "@/data/courses";

async function getData(slug: string) {
  return courses.courseList.find((c) => c.slug === slug);
  // const res = await Http.Get(`category/singleCategory?slug=${slug}`);
  // return await res.json();
}
export default async function CourseSingle({ params }: { params: { courseId: string } }) {
  const data = await getData(params.courseId);
  return (
    <div>
      <VideoPlayer id={data?.video[0].id} />
      {/* <VideoPlayer type='youtube' id='B7S5m8C-d8c' /> */}
      {JSON.stringify(data)}
    </div>
  );
}
