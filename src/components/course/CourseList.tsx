import type { CategoryType, CourseType, MediaType, Options } from "@/types/cources";
import CourseCard from "./CourseCard";
interface Course extends CourseType {
  slug: Options;
  category: CategoryType;
  media: MediaType;
  user: {
    id: number;
    name: string;
  };
}
type Props = {
  course: Course[];
  category: CategoryType[];
};
const CourseList = ({ category, course }: Props) => {
  return (
    <div className='home__courses-wrapper'>
      <div className='home__courses-first-row'>
        <h2 className='home__courses-heading'>Category</h2>
        <div>
          {category.map((item) => (
            <div key={item.id}>
              <p className='home__courses-text'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='home__courses-second-row'>
        <div className='home__courses-heading-wrapper'>
          <h2 className='home__courses-heading'>Newest Item</h2>
          <p className='home__courses-text'>
            <span className='home__courses-heading'>{course.length}</span> Courses
          </p>
        </div>
        <div className='courses__list-card-wrapper'>
          {course.map((item, i) => (
            <CourseCard
              url={item.slug.title}
              key={i}
              title={item.title}
              media={item.media.slug}
              type={item.type}
              length={item.length}
              lessons={item.lessons}
              user={item.user.name}
              oldPrice={item.oldPrice}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
