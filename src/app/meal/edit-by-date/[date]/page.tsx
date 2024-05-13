import React from 'react';
import { getMealsByDate, getMemberList } from '../../actions/meal';
import EditWindow from '../../_components/editWindow';
import { notFound } from 'next/navigation';

async function EditByDate({ params }: { params: { date: string } }) {
  if (params.date == undefined) return notFound();

  const date = new Date(params.date);
  if (isNaN(date.getTime())) {
    return <h1>Invalid Date</h1>;
  }
  //get member names for table column
  const memberList = await getMemberList();
  //get all meals of the date
  const mealsOfTheDay = await getMealsByDate(date);

  return (
    <div>
      <EditWindow
        date={date}
        memberList={memberList}
        mealsOfTheDay={mealsOfTheDay}
      />
    </div>
  );
}

export default EditByDate;
