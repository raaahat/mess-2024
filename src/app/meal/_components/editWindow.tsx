'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import React, { useState } from 'react';
import MealInputBox from './meal-input-box';
import { Meal } from '@/lib/definitions';
type MealCart = {
  memberId: string;
  meal: Meal;
}[];
function EditWindow({
  date,
  memberList,
  mealsOfTheDay,
}: {
  date: Date;
  memberList: {
    id: string;
    name: string;
  }[];
  mealsOfTheDay: {
    date: Date;
    id: string;
    breakfast: number;
    lunch: number;
    dinner: number;
    friday: number;
    member: {
      id: string;
      name: string;
    };
  }[];
}) {
  const intital_cart = mealsOfTheDay.map((obj) => {
    return {
      memberId: obj.member.id,
      meal: {
        breakfast: obj.breakfast,
        lunch: obj.lunch,
        dinner: obj.dinner,
        friday: obj.friday,
      },
    };
  });
  const [mealCart, setMealCart] = useState<MealCart>(intital_cart);
  function toggleBreakfast(id: string) {
    const index = mealCart.findIndex((obj) => obj.memberId === id);
    //if there is no entry, create one
    console.log(mealCart);

    if (index === -1) {
      setMealCart((prev) => [
        ...prev,
        {
          memberId: id,
          meal: {
            breakfast: 1,
            dinner: 0,
            lunch: 0,
            friday: 0,
          },
        },
      ]);
    } else {
      setMealCart((prev) => {
        return prev.map((obj) => {
          if (obj.memberId === id)
            return {
              ...obj,
              meal: {
                ...obj.meal,
                breakfast: obj.meal.breakfast === 0 ? 1 : 0,
              },
            };
          return obj;
        });
      });
    }
  }

  const toggleHandler = {
    toggleBreakfast,
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Date: {formatDate(date)}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.{' '}
              <br />
              <p>{JSON.stringify(mealsOfTheDay)}</p>
              <br />
              meal cart: {JSON.stringify(mealCart)}
            </DialogDescription>
          </DialogHeader>

          {memberList.map((member) => {
            const mealData = mealsOfTheDay.find(
              (obj) => obj.member.id === member.id
            );
            const meal = {
              breakfast: mealData?.breakfast,
              lunch: mealData?.lunch,
              dinner: mealData?.dinner,
              friday: mealData?.friday,
            };

            return (
              <div key={member.id}>
                <MealInputBox
                  memberList={member}
                  meal={meal}
                  toggleHandler={toggleHandler}
                />
              </div>
            );
          })}

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditWindow;
