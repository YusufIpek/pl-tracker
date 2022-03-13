import { createAsyncThunk } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { getPrivateLessons } from '../Firebase/Firebase';
import { PrivateLesson } from '../Models/PrivateLesson';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { addPrivateLesson } from '../Redux/slicer';

export default function Content() {
  const privateLessons: PrivateLesson[] = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className="m-10">
      {privateLessons.map((pL) => {
        return (
          <>
            <h2>{pL.startTimestamp}</h2>
          </>
        );
      })}
    </div>
  );
}
