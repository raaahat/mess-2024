'use server';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import MealInputBox from './meal-input-box';
import { getMealsByDate } from '../actions/meal';
import EditWindow from './editWindow';

export async function EditByDate({
  date,
  memberName,
}: {
  date: Date;
  memberName: { id: string; name: string }[];
}) {
  // const mealsOfTheDay = await prisma.dailyMeal.findMany({
  //   where: { date },
  //   select: {
  //     member: { select: { name: true, id: true } },
  //     id: true,
  //     breakfast: true,
  //     lunch: true,
  //     dinner: true,
  //     friday: true,
  //     date: true,
  //   },
  // });
  const mealsOfTheDay = await getMealsByDate(date);
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

    return {};
  };
  return (
    <EditWindow
      date={date}
      memberName={memberName}
      mealsOfTheDay={mealsOfTheDay}
    />
    // <>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Date: {formatDate(date)}</DialogTitle>
    //       <DialogDescription>
    //         Make changes to your profile here. Click save when youre done.
    //       </DialogDescription>
    //     </DialogHeader>

    //     {memberName.map((member) => {
    //       return (
    //         <div key={member.id}>
    //           <MealInputBox memberList={member} initMeal={getMeal(member.id)} />
    //         </div>
    //       );
    //     })}

    //     <DialogFooter>
    //       <Button type="submit">Save changes</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </>
  );
}
