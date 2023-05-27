import numbersFormat from "@/utils/numbersFormat";
type Props = {
  title: string;
  url: string;
  media: string;
  type: string;
  length: number;
  lessons: number;
  user: string;
  oldPrice: number;
  price: number;
};
const CourseCard = (props: Props) => {
  return (
    <a className='course' href={props.url}>
      <article className='course__card'>
        <img className='course__card-image' src={props.media} alt={props.title} />
        <div className='course__card-info'>
          <h2 className='course__card-heading'>{props.title}</h2>
          <div className='course__card-group'>
            <p>{props.type}</p>
            <p>{props.length}</p>
            <p>{props.lessons} Lesson</p>
          </div>
          <div className='course__card-group'>
            <div className='course__card-user-icon'>
              <p className='course__card-user-icon-text'>IC</p>
            </div>
            <p className='course__card-user-text'>{props.user}</p>
          </div>
        </div>
        <div className='course__card-price-wrapper'>
          <span className='course__card-price course__card-oldprice'>৳ {numbersFormat(props.oldPrice)}</span>
          <span className='course__card-price'>৳ {numbersFormat(props.price)}</span>
        </div>
      </article>
    </a>
  );
};

export default CourseCard;
