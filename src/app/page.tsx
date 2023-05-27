import CourseCard from "@/components/course/CourseCard";
import courses from "@/data/courses";
export default async function Home() {
  return (
    <main className='container '>
      <h1 className='home__heading'>courses</h1>
      <section className='home__courses'>
        <p className='home__text'>All Courses You Can Filter</p>
        <div className='home__courses-wrapper'>
          <div className='home__courses-first-row'>
            <h2 className='home__courses-heading'>Category</h2>
            <div>
              {courses.categoryList.map((item) => (
                <div key={item.id}>
                  <p className='home__courses-text'>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='home__courses-second-row'>
            <div className='home__courses-heading-wrapper'>
              <h2 className='home__courses-heading'>Newest Item</h2>
              <p className='home__courses-text'>
                <span className='home__courses-heading'>{courses.courseList.length}</span> Courses
              </p>
            </div>
            <div className='courses__list-card-wrapper'>
              {courses.courseList.map((item, i) => (
                <CourseCard
                  url={item.slug}
                  key={i}
                  title={item.title}
                  media={item.media.url}
                  type={item.course_type}
                  length={item.course_length}
                  lessons={item.course_lessons}
                  user={item.course_user.name}
                  oldPrice={item.course_oldPrice}
                  price={item.course_price}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
