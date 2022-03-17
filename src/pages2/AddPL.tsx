import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CButton from '../components2/CButton';
import Input from '../components2/Input';
import { addPrivateLesson, updatePrivateLesson } from '../firebase2/Firebase';
import {
  addPrivateLesson as addAction,
  updatePrivateLesson as updateAction,
} from '../redux2/slicer';
import { PrivateLesson } from '../models2/PrivateLesson';
import { useAppDispatch, useAppSelector } from '../redux2/hooks';

export default function AddPL() {
  const navigate = useNavigate();
  const { id } = useParams();
  const privateLessons: PrivateLesson[] = useAppSelector((state) => state);
  const [privateLesson, setPrivateLesson] = useState<PrivateLesson>({
    id: '',
    end: '',
    start: '',
    notice: '',
    student: '',
    subject: '',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      setPrivateLesson(
        (lastValue) =>
          privateLessons.find((item) => item.id === id) ?? lastValue
      );
    }
  }, [id, privateLessons]);

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as any;

    setPrivateLesson((lastValue) => {
      return { ...lastValue, [name]: value };
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    (async () => {
      if (id) {
        // update
        const response = await updatePrivateLesson(privateLesson);
        if (response) {
          dispatch(updateAction(privateLesson));
          navigate('/');
        }
        return;
      }

      // add new
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
        value={privateLesson?.start ?? ''}
        onChange={changeHandler}
        required={true}
      />
      <Input
        placeholder="Ende"
        type="datetime-local"
        className="mt-2"
        name="end"
        value={privateLesson?.end ?? ''}
        onChange={changeHandler}
        required={true}
      />
      <Input
        placeholder="Schüler"
        type="text"
        className="mt-2"
        name="student"
        value={privateLesson?.student ?? ''}
        onChange={changeHandler}
      />
      <Input
        placeholder="Fach"
        type="text"
        className="mt-2"
        name="subject"
        value={privateLesson?.subject ?? ''}
        onChange={changeHandler}
      />
      <Input
        placeholder="Notiz"
        type="text"
        className="mt-2"
        name="notice"
        value={privateLesson?.notice ?? ''}
        onChange={changeHandler}
      />

      <CButton text={id ? 'Bearbeiten' : 'Speichern'} className="mt-2" />
    </form>
  );
}
