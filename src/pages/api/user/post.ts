import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/helper/prisma";
import { encodePassword } from "@/helper/bcrypt";
type Data = {
  name: string;
  email: string;
  password: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body as Data;
  if (req.method === "POST") {
    try {
      const passWord = await encodePassword(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passWord,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  } else {
    res.status(400).json("method not implemented");
  }
}
