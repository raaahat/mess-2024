'use server';
import prisma from '@/lib/prisma';

export async function addMealByDate(date: Date) {
  const res = await prisma.dailyMeal.createMany({
    data: [
      {
        date,
        memberId: '306349d0-ffe6-47c6-8224-28f9e7b34215',
        breakfast: 1,
        lunch: 1,
        dinner: 1,
      },
      {
        date,
        memberId: '6283915b-e380-4084-bcfd-009ef6c29383',
        breakfast: 1,
        lunch: 0,
        dinner: 0,
      },
      {
        date,
        memberId: 'aa383cdd-ff9c-4366-ac99-9640fa2d5f73',
        breakfast: 1,
        lunch: 0,
        dinner: 0,
      },
      {
        date,
        memberId: 'aa383cdd-ff9c-4366-ac99-9640fa2d5f73',
        breakfast: 1,
        lunch: 1,
        dinner: 1,
      },
      {
        date,
        memberId: 'aa383cdd-ff9c-4366-ac99-9640fa2d5f73',
        breakfast: 1,
        lunch: 0,
        dinner: 1,
      },
    ],
  });
  console.log(res);
  // await prisma.dailyMeal.upsert({
  //   where: { date },
  //   create: {
  //     date,
  //     memberId: '306349d0-ffe6-47c6-8224-28f9e7b34215',
  //     breakfast: 1,
  //     lunch: 0,
  //     dinner: 1,
  //   },
  //   update: {
  //     memberId: '306349d0-ffe6-47c6-8224-28f9e7b34215',
  //     breakfast: 1,
  //     lunch: 0,
  //     dinner: 1,
  //   },
  // });
}
export async function getMealsByDate(date: Date) {
  const mealsOfTheDay = await prisma.dailyMeal.findMany({
    where: { date },
    select: {
      member: { select: { name: true, id: true } },
      id: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      friday: true,
      date: true,
    },
  });
  return mealsOfTheDay;
}
