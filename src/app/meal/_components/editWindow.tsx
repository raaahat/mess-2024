'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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
import Link from 'next/link';
type MealCart = {
  memberId: string;
  meal: {
    breakfast?: number | null;
    lunch?: number | null;
    dinner?: number | null;
    friday?: number | null;
  };
}[];
function EditWindow({
  date,
  memberName,
  mealsOfTheDay,
}: {
  date: Date;
  memberName: {
    id: string;
    name: string;
  }[];
  mealsOfTheDay: {
    date: Date;
    id: string;
    breakfast: number | null;
    lunch: number | null;
    dinner: number | null;
    friday: number | null;
    member: {
      id: string;
      name: string;
    };
  }[];
}) {
  const [mealCart, setMealCart] = useState<MealCart>([]);
  function modifyCart(
    id: string,
    meal: {
      breakfast?: number | null;
      lunch?: number | null;
      dinner?: number | null;
      friday?: number | null;
    }
  ) {
    // if cart is empty, just add to cart
    if (mealCart.length === 0) {
      setMealCart([{ memberId: id, meal }]);
      return;
    }
    // if member id does not exist in cart, add to cart
    if (mealCart.findIndex((obj) => obj.memberId === id) < -1) {
      setMealCart((prev) => [...prev, { memberId: id, meal }]);
      return;
    }
    //if member id exists, update the meals
    setMealCart((prev) => {
      return prev.map((obj) => {
        if (obj.memberId === id)
          return { ...obj, meal: { ...obj.meal, ...meal } };
        return obj;
      });
    });
  }

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
  console.log(mealCart);
  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogClose asChild>
            <Link href="/meal">x</Link>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Date: {formatDate(date)}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>

          {memberName.map((member) => {
            return (
              <div key={member.id}>
                <MealInputBox
                  memberList={member}
                  initMeal={getMeal(member.id)}
                  modifyCart={modifyCart}
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
