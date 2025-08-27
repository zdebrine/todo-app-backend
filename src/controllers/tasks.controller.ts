import { Request, Response } from "express";
import { prisma } from "../db";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/tasks.schema";

export async function getTasks(req: Request, res: Response) {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(tasks);
}

export async function createTask(req: Request, res: Response) {
    console.log(req.body)
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { title, color, completed = false } = parsed.data;
  const task = await prisma.task.create({
    data: { title, color: color ?? null, completed },
  });
  res.status(201).json(task);
}

export async function updateTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "invalid id" });
  }
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { title, color, completed } = parsed.data;
  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(color !== undefined ? { color } : {}),
      ...(completed !== undefined ? { completed } : {}),
    },
  });
  res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "invalid id" });

  await prisma.task.delete({ where: { id } });
  res.status(204).send();
}
