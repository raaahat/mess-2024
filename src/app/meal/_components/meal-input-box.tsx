'use client';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
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
};

function MealInputBox({ memberList, initMeal = {} }: MealInputBoxProps) {
  const [meal, setMeal] = useState<typeof initMeal>(initMeal);
  return (
    <div>
      <Label htmlFor="name" className="text-right">
        {memberList.name}
      </Label>
      <button className="m-2 bg-gray-200 w-6 rounded-sm">
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
