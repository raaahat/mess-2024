import prisma from '@/lib/prisma';
import React from 'react';
import { getMealsByDate } from '../actions/meal';
import EditWindow from '../_components/editWindow';

async function EditByDate() {
  const date = new Date('2024-04-13');
  //geting member names for table header row
  const memberName = await prisma.member.findMany({
    select: { id: true, name: true },
    orderBy: [{ is_applicableFor_sc: 'desc' }, { createdAt: 'asc' }],
  });
  const mealsOfTheDay = await getMealsByDate(date);
  console.log(mealsOfTheDay);
  const getMeal = (id: string) => {
    const matchedMeal = mealsOfTheDay.find((meal) => meal.member.id === id);

    // returns a new object if found
    if (matchedMeal)
      return {
        breakfast: matchedMeal?.breakfast,
        lunch: matchedMeal?.lunch,
        dinner: matchedMeal?.dinner,
        friday: matchedMeal?.friday,
      };
  };
  return (
    <div>
      <EditWindow
        date={date}
        memberName={memberName}
        mealsOfTheDay={mealsOfTheDay}
      />
    </div>
  );
}

export default EditByDate;
