import React from 'react';
import { getMealsByDate, getMemberList } from '../actions/meal';
import EditWindow from '../_components/editWindow';

async function EditByDate() {
  const date = new Date('2024-04-13');
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
