import VideoPlayer from "@/components/video/VideoPlayer";
import Http from "@/helper/http";
import courses from "@/data/courses";
import { PlusIcon } from "@/constants/icons";

async function getData(slug: string) {
  return courses.courseList.find((c) => c.slug === slug);
  // const res = await Http.Get(`category/singleCategory?slug=${slug}`);
  // return await res.json();
}
export default async function CourseSingle({ params }: { params: { courseId: string } }) {
  const data = await getData(params.courseId);
  return (
    <section className='course-single'>
      <div className='course-single__first-row'>
        <div className='course-single__topic-head'>
          <h2 className='course-single__topic-heading'>HTML</h2>
          <button type='button'>
            <PlusIcon className='course-single__topic-icon' />
          </button>
        </div>
        <div className='course-single__topic-body'>
          <div className='course-single__topic-wrapper'>
            <div className='course-single__topic-first-row'>
              <img className='course-single__topic-image' src='/youtubeIcon.png' alt='youtubeIcon' />
              <p className='course-single__topic-title'>HTML Basics</p>
            </div>
            <p className='course-single__topic-time'>00:03:29</p>
          </div>
          <div className='course-single__topic-wrapper'>
            <div className='course-single__topic-first-row'>
              <img className='course-single__topic-image' src='/youtubeIcon.png' alt='youtubeIcon' />
              <p className='course-single__topic-title'>HTML Basics</p>
            </div>
            <p className='course-single__topic-time'>00:03:29</p>
          </div>
        </div>
      </div>
      <div className='course-single__second-row'>
        <div className='course-single__video-wrapper'>
          <VideoPlayer className='course-single__video' id={data?.video[0].id} />
        </div>
      </div>
    </section>
  );
}
