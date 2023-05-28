// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/helper/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const slug = req.query.slug as string;
    try {
      const data = await prisma.slug.findUnique({
        where: {
          title: slug as string,
        },
        select: {
          course: {
            select: {
              id: true,
              title: true,
              type: true,
              slug: true,
              review_rate: true,
              lessons: true,
              length: true,
              price: true,
              oldPrice: true,
              published: true,
              media: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                },
              },
              topic: {
                select: {
                  id: true,
                  title: true,
                  type: true,
                  video_id: true,
                  slug: true,
                  durations: true,
                },
              },
              category: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                },
              },
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return res.status(200).json(data?.course);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  } else {
    return res.status(400).json({ data: `${req.method} method not implemented` });
  }
}
