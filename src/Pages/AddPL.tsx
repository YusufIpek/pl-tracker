import { Timestamp } from 'firebase/firestore';
import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CButton from '../Components/CButton';
import Input from '../Components/Input';
import { addPrivateLesson } from '../Firebase/Firebase';
import { addPrivateLesson as addAction } from '../Redux/slicer';
import { PrivateLesson } from '../Models/PrivateLesson';
import { useAppDispatch } from '../Redux/hooks';

export default function AddPL() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.target as HTMLFormElement);

    const privateLesson: PrivateLesson = {
      endTimestamp: new Date(values.get('end')?.toString() as string),
      startTimestamp: new Date(values.get('start')?.toString() as string),
      notice: values.get('notice')?.toString(),
      studentName: values.get('student')?.toString(),
      subject: values.get('subject')?.toString(),
    };

    (async () => {
      addPrivateLesson(privateLesson).then((response) => {
        dispatch(addAction(privateLesson));

        if (response) {
          navigate('/');
        }
      });
    })();
  };

  return (
    <form onSubmit={submit} className="m-10">
      <Input
        placeholder="Start"
        type="datetime-local"
        className="mt-2"
        name="start"
      />
      <Input
        placeholder="Ende"
        type="datetime-local"
        className="mt-2"
        name="end"
      />
      <Input
        placeholder="Schüler"
        type="text"
        className="mt-2"
        name="student"
      />
      <Input placeholder="Fach" type="text" className="mt-2" name="subject" />
      <Input placeholder="Notiz" type="text" className="mt-2" name="notice" />

      <CButton text="Speichern" className="mt-2" />
    </form>
  );
}
