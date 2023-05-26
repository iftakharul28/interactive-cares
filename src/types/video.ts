export type videoType = {
  title: string;
  channelId: string;
  channelTitle: string;
  description: string;
  lengthText: string;
  publishedText: string;
  richThumbnail: mediaType[];
  channelThumbnail: mediaType[];
  thumbnail: mediaType[];
  videoId: string;
  viewCount: string;
};
export type mediaType = {
  height: number;
  width: number;
  url: string;
};
