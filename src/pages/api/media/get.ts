// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/helper/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await prisma.media.findMany();
      return res.status(200).json(data);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  } else {
    return res.status(400).json({ data: `${req.method} method not allowed` });
  }
}
