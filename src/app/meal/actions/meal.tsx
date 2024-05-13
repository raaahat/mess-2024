'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function getMemberList() {
  return await prisma.member.findMany({
    select: { id: true, name: true },
    orderBy: [{ is_applicableFor_sc: 'desc' }, { createdAt: 'asc' }],
  });
}
export async function upsertMealsData(
  mealCart: {
    id?: string;
    memberId: string;
    meal: {
      breakfast: number;
      lunch: number;
      dinner: number;
      friday: number;
    };
  }[],
  date: Date
) {
  mealCart.map(async (obj) => {
    if (obj.id !== undefined) {
      await prisma.dailyMeal.update({
        where: { id: obj.id },
        data: { ...obj.meal },
      });
    } else {
      await prisma.dailyMeal.create({
        data: {
          date,
          memberId: obj.memberId,
          ...obj.meal,
        },
      });
    }
  });

  revalidatePath('/meal');
  redirect('/meal');
}
