"use client";
type Props = {
  id?: number;
  type?: "youtube" | "default";
  width?: number;
  height?: number;
  className?: string;
};
const VideoPlayer = (props: Props) => {
  if (props.type === "youtube") {
    return (
      <iframe
        width='560'
        height='315'
        src={`https://www.youtube.com/embed/${props.id}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; picture-in-picture; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen={true}></iframe>
    );
  }
  return (
    <iframe
      className={props.className ? `${props.className}` : ""}
      src={`https://player.vimeo.com/video/${props.id}`}
      width={props.width ? `${props.width}` : "640"}
      height={props.height ? `${props.height}` : "360"}
      allow='autoplay; fullscreen; picture-in-picture'
      frameBorder={0}
      allowFullScreen={true}></iframe>
  );
};

export default VideoPlayer;
