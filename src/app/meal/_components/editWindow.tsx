'use client';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import React, { useState } from 'react';
import MealInputBox from './meal-input-box';
import { Meal } from '@/lib/definitions';
import { upsertMealsData } from '../actions/meal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFormStatus } from 'react-dom';
type MealCart = {
  id?: string;
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
      id: obj.id,
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
  function toggleLunch(id: string) {
    const index = mealCart.findIndex((obj) => obj.memberId === id);
    //if there is no entry, create one

    if (index === -1) {
      setMealCart((prev) => [
        ...prev,
        {
          memberId: id,
          meal: {
            breakfast: 0,
            dinner: 0,
            lunch: 1,
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
                lunch: obj.meal.lunch === 0 ? 1 : 0,
              },
            };
          return obj;
        });
      });
    }
  }
  function toggleDinner(id: string) {
    const index = mealCart.findIndex((obj) => obj.memberId === id);
    //if there is no entry, create one

    if (index === -1) {
      setMealCart((prev) => [
        ...prev,
        {
          memberId: id,
          meal: {
            breakfast: 0,
            dinner: 1,
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
                dinner: obj.meal.dinner === 0 ? 1 : 0,
              },
            };
          return obj;
        });
      });
    }
  }
  function toggleFriday(id: string) {
    const index = mealCart.findIndex((obj) => obj.memberId === id);
    //if there is no entry, create one

    if (index === -1) {
      setMealCart((prev) => [
        ...prev,
        {
          memberId: id,
          meal: {
            breakfast: 0,
            dinner: 0,
            lunch: 0,
            friday: 1,
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
                friday: obj.meal.friday === 0 ? 1 : 0,
              },
            };
          return obj;
        });
      });
    }
  }

  const toggleHandler = {
    toggleBreakfast,
    toggleLunch,
    toggleDinner,
    toggleFriday,
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Date: {formatDate(date)}</CardTitle>
          <CardDescription>
            Make changes by clicking on meal box. Click save when youre done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {memberList.map((member) => {
            const mealData = mealCart.find((obj) => obj.memberId === member.id);
            const meal = {
              breakfast: mealData?.meal.breakfast,
              lunch: mealData?.meal.lunch,
              dinner: mealData?.meal.dinner,
              friday: mealData?.meal.friday,
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
        </CardContent>
        <CardFooter>
          <form
            action={async (formData) => {
              await upsertMealsData(mealCart, date);
            }}
          >
            <SubmitButton />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save changes'}
    </Button>
  );
}
export default EditWindow;
