'use client';
import { Label } from '@/components/ui/label';
import React from 'react';
type MealInputBoxProps = {
  memberList: { id: string; name: string };
  meal: {
    breakfast: number | undefined;
    lunch: number | undefined;
    dinner: number | undefined;
    friday: number | undefined;
  };
  toggleHandler: {
    toggleBreakfast: (id: string) => void;
  };
};

function MealInputBox({ memberList, meal, toggleHandler }: MealInputBoxProps) {
  return (
    <div>
      <Label htmlFor="name" className="text-right">
        {memberList.name}
      </Label>
      <button
        className="m-2 bg-gray-200 w-6 rounded-sm"
        onClick={() => toggleHandler.toggleBreakfast(memberList.id)}
      >
        {meal?.breakfast
          ? meal.breakfast == 0
            ? meal.breakfast
            : meal.breakfast
          : '-'}
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
