import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = { ok: boolean } | { error: string };

export async function GET(request: Request) {
	const data = new URLSearchParams(request.url.split("?")[1]);
	const userId = data.get("user");
	if (typeof userId === null)
		return Response.json(
			{
				error: "Missing required field user",
			},
			{
				status: 400,
			}
		);

	const user = await prisma.user.findFirst({
		where: {
			userId: +userId!,
		},
	});
	return Response.json({ user: user });
}

export async function POST(request: Request) {
	const req = await request.json();

	if (!req.user) {
		return Response.json(
			{
				error: "Missing required field user",
			},
			{
				status: 400,
			}
		);
	}

	const user = await prisma.user.upsert({
		create: {
			userId: req.user.id,
			username: req.user.username,
			point: 838 + (req.user.is_premium ? 300 : 0),
			isPremium: req.user.is_premium ?? false,
			// refId:
		},
		update: {},
		where: {
			userId: req.user.id,
		},
	});
	return Response.json({ user: user });
}
