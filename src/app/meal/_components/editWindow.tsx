'use client';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import React from 'react';
import MealInputBox from './meal-input-box';

function EditWindow({
  date,
  memberName,
  getMeal,
}: {
  date: Date;
  memberName: {
    id: string;
    name: string;
  }[];
  getMeal: (id: string) =>
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
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Date: {formatDate(date)}</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when youre done.
        </DialogDescription>
      </DialogHeader>

      {memberName.map((member) => {
        return (
          <div key={member.id}>
            <MealInputBox memberList={member} initMeal={getMeal(member.id)} />
          </div>
        );
      })}

      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default EditWindow;
