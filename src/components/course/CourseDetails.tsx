"use client";
import type { CourseType, Options, CategoryType, MediaType, TopicType } from "@/types/cources";
import VideoPlayer from "../video/VideoPlayer";
import { PlusIcon } from "@/constants/icons";
import { useState } from "react";
import Button from "../Button";
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

const CourseDetails = ({ course }: { course: Course }) => {
  const [selectTopic, setSelectTopic] = useState<TopicType>(course.topic[0]);
  return (
    <>
      <div className='course-single__first-row'>
        <div className='course-single__topic-head'>
          <h2 className='course-single__topic-heading'>HTML</h2>
          <button type='button'>
            <PlusIcon className='course-single__topic-icon' />
          </button>
        </div>
        <div className='course-single__topic-body'>
          {course.topic.map((topic, i) => (
            <Button onClick={() => setSelectTopic(topic)} className='course-single__topic-wrapper' key={`topic-no-${i}`}>
              <div className='course-single__topic-first-row'>
                <img className='course-single__topic-image' src='/youtubeIcon.png' alt='youtubeIcon' />
                <p className='course-single__topic-title'>{topic.title}</p>
              </div>
              <p className='course-single__topic-time'>{topic.durations}</p>
            </Button>
          ))}
        </div>
      </div>
      <div className='course-single__second-row'>
        <div className='course-single__video-wrapper'>
          <VideoPlayer type='default' className='course-single__video' id={selectTopic?.video_id} />
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
