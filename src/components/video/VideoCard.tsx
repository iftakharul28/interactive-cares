"use client";
import { formatViews } from "@/utils/formatViews";
type Props = {
  url: string;
  title: string;
  thumbnail: string;
  channelThumbnail: string;
  channelTitle: string;
  lengthText: string;
  viewCount: string;
  publishedText: string;
};
const VideoCard = (props: Props) => {
  return (
    <article className='video-card'>
      <img src={props.thumbnail} className='video-card__image' />
      <div className='flex items-end mr-2 mb-5 -mt-6'>
        <div className='bg-black rounded px-1'>
          <p className='text-white font-semibold text-xs'>{props.lengthText}</p>
        </div>
      </div>
      <div className='video-card__body'>
        <img className='video-card__thumbnail' src={props.channelThumbnail} />
        <div className='flex-1 space-y-1'>
          <p className='video-card__text'>{props.title}</p>
          <p className='video-card__text'>
            {props.channelTitle.length > 20 ? props.channelTitle.slice(0, 20) + "..." : props.channelTitle} • {formatViews(Number(props.viewCount))} views • {props.publishedText}
          </p>
        </div>
        <div className='self-start'>{/* <Icon.MoreVertical stroke="white" strokeWidth={2} height={15} /> */}</div>
      </div>
    </article>
  );
};

export default VideoCard;
