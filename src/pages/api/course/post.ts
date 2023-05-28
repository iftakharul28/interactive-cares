// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/helper/prisma";
import type { TopicType } from "@/types/cources";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { title, slug, type, review_rate, lessons, price, oldPrice, length, topic, media, category, published } = req.body;
  if (req.method === "POST") {
    try {
      await prisma.course.create({
        data: {
          title,
          type,
          review_rate,
          lessons,
          length,
          price,
          oldPrice,
          published,
          slug: {
            connectOrCreate: {
              create: {
                title: slug,
              },
              where: {
                title: slug,
              },
            },
          },
          category: {
            connectOrCreate: {
              create: {
                title: category.title,
                slug: category.slug,
              },
              where: {
                slug: category.slug,
              },
            },
          },
          media: {
            connectOrCreate: {
              create: {
                title: media.title,
                slug: media.slug,
              },
              where: {
                slug: media.slug,
              },
            },
          },
          topic: {
            connectOrCreate: topic?.map(({ title, slug, type, video_id, durations }: TopicType) => {
              return {
                create: {
                  title: title,
                  slug: slug,
                  type: type,
                  video_id: video_id,
                  durations: durations,
                },
                where: {
                  slug: slug,
                },
              };
            }),
          },
          user: {
            connect: {
              email: session?.user.email ?? "",
            },
          },
        },
      });
      return res.status(201).json({ data: "data has been saved successfully" });
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  } else {
    return res.status(400).json({ data: `${req.method} method not implemented` });
  }
}
