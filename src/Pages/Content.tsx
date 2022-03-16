import { createAsyncThunk } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../Components/ActionButton';
import Input from '../Components/Input';
import { getPrivateLessons } from '../Firebase/Firebase';
import { PrivateLesson } from '../Models/PrivateLesson';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { addPrivateLesson } from '../Redux/slicer';
import AddPL from './AddPL';

export default function Content() {
  const navigate = useNavigate();

  const privateLessons: PrivateLesson[] = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className="m-10">
      <Input type="text" placeholder="Suchen" name="search" />
      {privateLessons.map((pL) => {
        return (
          <div key={pL.id} className="flex justify-evenly mt-2">
            <div>{pL.studentName}</div>
            <div>{new Date(pL.startTimestamp).toLocaleDateString('de-DE')}</div>
            <div>{new Date(pL.endTimestamp).toLocaleDateString('de-DE')}</div>
            <div>{pL.subject}</div>
          </div>
        );
      })}
      <ActionButton
        className="absolute bottom-[35px] right-[45px]"
        text="+"
        onClick={() => {
          navigate('/add');
        }}
      />
    </div>
  );
}
