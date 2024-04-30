import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Fragment } from 'react';

async function EditByDate({
  date,
  memberName,
}: {
  date: Date;
  memberName: { id: string; name: string }[];
}) {
  const mealsOfTheDay = await prisma.dailyMeal.findMany({
    where: { date },
    select: {
      member: { select: { name: true, id: true } },
      id: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      friday: true,
      date: true,
    },
  });
  console.log(mealsOfTheDay);
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Date: {formatDate(date)}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {memberName.map((member) => {
              return (
                <Fragment key={member.id}>
                  <Label htmlFor="name" className="text-right">
                    {member.name}
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </Fragment>
              );
            })}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}

export default EditByDate;
