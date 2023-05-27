// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/helper/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { title, slug, type, review_rate, lessons, price, oldPrice, length, video, topic, media, email, variants, category, tag, specifications, published } = req.body;
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
                url: slug,
              },
              where: {
                url: slug,
              },
            },
          },
          category: {
            connectOrCreate: {
              create: {
                title: category.title,
                url: category.url,
              },
              where: {
                url: category.url,
              },
            },
          },
          media: {
            connectOrCreate: {
              create: {
                title: media.title,
                url: media.url,
              },
              where: {
                url: media.url,
              },
            },
          },
          topic: {
            connectOrCreate: {
              create: {
                title: topic.title,
                url: topic.url,
                video: {
                  connectOrCreate: {
                    create: {
                      title: video.title,
                      url: video.url,
                      type: video.type,
                    },
                    where: {
                      url: video.url,
                    },
                  },
                },
              },
              where: {
                url: topic.url,
              },
            },
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
