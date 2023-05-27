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
            connectOrCreate: topic?.map(({ title, url }: { title: string; url: string }) => {
              return {
                create: {
                  title: title,
                  url: url,
                  video: {
                    connectOrCreate: video?.map(({ title, url, type }: { title: string; url: string; type: string }) => {
                      return {
                        create: {
                          title: title,
                          url: url,
                          type: type,
                        },
                        where: {
                          url: url,
                        },
                      };
                    }),
                  },
                },
                where: {
                  url: url,
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
