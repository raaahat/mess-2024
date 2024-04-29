import { checkFriday } from '@/lib/utils';
import { DailyMeal } from '@prisma/client';
import React from 'react';
async function MealCell({ data }: { data: DailyMeal | undefined }) {
  if (data === null) return <p>-</p>;
  if (data === undefined) return <p>--</p>;
  return (
    <div className="flex gap-2">
      <div className="w-7 text-center border border-gray-700 rounded-sm">
        {data?.breakfast}
      </div>
      <div className="w-7 text-center border border-gray-700 rounded-sm">
        {checkFriday(data.date) ? data.friday : data.lunch}
      </div>
      <div className="w-7 text-center border border-gray-700 rounded-sm">
        {data?.dinner}
      </div>
    </div>
  );
}

export default MealCell;
