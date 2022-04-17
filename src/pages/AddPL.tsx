import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CButton from '../components/CButton';
import Input from '../components/Input';
import { addPrivateLesson, updatePrivateLesson } from '../firebase/Firebase';
import {
  addPrivateLesson as addAction,
  updatePrivateLesson as updateAction,
} from '../redux/slicer';
import { PrivateLesson } from '../models/PrivateLesson';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Label } from '../components/CustomStyledComponents';

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
      <div>
        <Label htmlFor="start">Start</Label>
        <Input
          id="start"
          placeholder="Start"
          type="datetime-local"
          className="mt-2"
          name="start"
          value={privateLesson?.start ?? ''}
          onChange={changeHandler}
          required={true}
        />
      </div>
      <div className="mt-5">
        <Label htmlFor="end">Ende</Label>
        <Input
          id="end"
          placeholder="Ende"
          type="datetime-local"
          className="mt-2"
          name="end"
          value={privateLesson?.end ?? ''}
          onChange={changeHandler}
          required={true}
        />
      </div>
      <div className="mt-5">
        <Label htmlFor="student">Schüler</Label>
        <Input
          id="student"
          placeholder="Schüler"
          type="text"
          className="mt-2"
          name="student"
          value={privateLesson?.student ?? ''}
          onChange={changeHandler}
        />
      </div>
      <div className="mt-5">
        <Label htmlFor="subject">Fach</Label>
        <Input
          id="subject"
          placeholder="Fach"
          type="text"
          className="mt-2"
          name="subject"
          value={privateLesson?.subject ?? ''}
          onChange={changeHandler}
        />
      </div>
      <div className="mt-5 mb-5">
        <Label htmlFor="notice">Notiz</Label>
        <Input
          id="notice"
          placeholder="Notiz"
          type="text"
          className="mt-2"
          name="notice"
          value={privateLesson?.notice ?? ''}
          onChange={changeHandler}
        />
      </div>
      <CButton text={id ? 'Bearbeiten' : 'Speichern'} className="mt-2" />
    </form>
  );
}
