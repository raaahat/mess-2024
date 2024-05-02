'use client';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
type MealInputBoxProps = {
  memberList: { id: string; name: string };
  initMeal?:
    | {
        breakfast: number | null;
        lunch: number | null;
        dinner: number | null;
        friday: number | null;
      }
    | {
        breakfast?: undefined;
        lunch?: undefined;
        dinner?: undefined;
        friday?: undefined;
      };
  modifyCart: (
    id: string,
    meal: {
      breakfast?: number | null;
      lunch?: number | null;
      dinner?: number | null;
      friday?: number | null;
    }
  ) => void;
};

function MealInputBox({
  memberList,
  initMeal = {},
  modifyCart,
}: MealInputBoxProps) {
  const [meal, setMeal] = useState<typeof initMeal>(initMeal);
  useEffect(() => {
    modifyCart(memberList.id, meal);
  }, [meal]);
  function handleBreakfast() {
    if (!meal?.breakfast) {
      setMeal({ ...meal });
    }
  }
  return (
    <div>
      <Label htmlFor="name" className="text-right">
        {memberList.name}
      </Label>
      <button
        onClick={handleBreakfast}
        className="m-2 bg-gray-200 w-6 rounded-sm"
      >
        {meal?.breakfast || '-'}
      </button>
      <button className="m-2 bg-gray-200 w-6 rounded-sm">
        {meal?.lunch || '-'}
      </button>
      <button className="m-2 bg-gray-200 w-6 rounded-sm">
        {meal?.dinner || '-'}
      </button>
      <button className="m-2 bg-gray-200 w-6 rounded-sm">
        {meal?.friday || '-'}
      </button>
    </div>
  );
}

export default MealInputBox;
