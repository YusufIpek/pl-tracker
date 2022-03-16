import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import CButton from '../Components/CButton';
import Input from '../Components/Input';

export default function AddPL() {
  const navigate = useNavigate();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.target as HTMLFormElement);

    for (let elem of values.values()) {
      console.log(elem);
    }

    navigate('/');
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
