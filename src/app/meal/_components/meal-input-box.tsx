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
    toggleLunch: (id: string) => void;
    toggleDinner: (id: string) => void;
    toggleFriday: (id: string) => void;
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
        {meal?.breakfast === undefined ? '-' : meal.breakfast}
      </button>
      <button
        className="m-2 bg-gray-200 w-6 rounded-sm"
        onClick={() => toggleHandler.toggleLunch(memberList.id)}
      >
        {meal?.lunch === undefined ? '-' : meal.lunch}
      </button>
      <button
        className="m-2 bg-gray-200 w-6 rounded-sm"
        onClick={() => toggleHandler.toggleDinner(memberList.id)}
      >
        {meal?.dinner === undefined ? '-' : meal.dinner}
      </button>
      <button
        className="m-2 bg-gray-200 w-6 rounded-sm"
        onClick={() => toggleHandler.toggleFriday(memberList.id)}
      >
        {meal?.friday === undefined ? '-' : meal.friday}
      </button>
    </div>
  );
}

export default MealInputBox;
