import prisma from '@/lib/prisma';
import { createDateArray } from '@/lib/utils';
import React from 'react';

export default async function EditBySingleId({
  params,
}: {
  params: { id: string };
}) {
  const meals = await prisma.dailyMeal.findMany({
    where: { memberId: params.id },
  });
  if (meals.length === 0) {
    return <h1>no meal found</h1>;
  }
  const startDate = new Date('2024-04-12');
  const endDate = new Date('2024-05-14');
  const dates = createDateArray(startDate, endDate);
  return (
    <div>
      EditBySingleId
      <div>{params.id}</div>
      {meals.map((meal) => {
        return <div key={meal.id}> date{meal.date.toString()}</div>;
      })}
    </div>
  );
}
