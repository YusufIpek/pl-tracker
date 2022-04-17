import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import Input from '../components/Input';
import { PrivateLesson } from '../models/PrivateLesson';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { deletePrivateLesson } from '../firebase/Firebase';
import { removePrivateLesson as removeAction } from '../redux/slicer';
import ContentRow from './ContentRow';

library.add(faTrashCan, faEdit);

export default function Content() {
  const navigate = useNavigate();

  const privateLessons: PrivateLesson[] = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const deleteEntry = (id?: string) => {
    if (id) {
      if (confirm('Eintrag löschen?')) {
        deletePrivateLesson(id);
        dispatch(removeAction(id));
      }
    }
  };

  const editEntry = (id?: string) => {
    if (id) {
      navigate('edit/' + id);
    }
  };

  const sortLessons = (lessons: PrivateLesson[]) => {
    // descending order
    return lessons
      .slice()
      .sort((a, b) =>
        new Date(a.start).getTime() > new Date(b.start).getTime()
          ? -1
          : new Date(a.start).getTime() === new Date(b.start).getTime()
          ? 0
          : 1
      );
  };

  return (
    <div className="m-10">
      <Input type="text" placeholder="Suchen" name="search" />
      {sortLessons(privateLessons).map((pL) => {
        return (
          <div
            key={pL.id}
            className="flex flex-col sm:flex-row mt-2 bg-gray-200 rounded-md"
          >
            <ContentRow label="Schüler" value={pL.student}></ContentRow>
            <ContentRow label="Fach" value={pL.subject}></ContentRow>
            <ContentRow
              label="Start"
              value={new Date(pL.start).toLocaleString('de-DE')}
            ></ContentRow>
            <ContentRow
              label="Ende"
              value={new Date(pL.end).toLocaleString('de-DE')}
            ></ContentRow>

            <div className="w-full sm:w-fit text-center relative">
              <button
                onClick={() => editEntry(pL.id)}
                className="h-[40px] sm:h-full w-full sm:w-[60px] bg-blue-600"
              >
                <FontAwesomeIcon
                  icon={'edit'}
                  className="cursor-pointer text-white m-auto"
                />
              </button>
            </div>
            <div className="w-full sm:w-fit text-center relative">
              <button
                onClick={() => deleteEntry(pL.id)}
                className="h-[40px] sm:h-full w-full sm:w-[60px] bg-red-600 rounded-bl-md rounded-br-md sm:rounded-bl-none sm:rounded-tr-md sm:rounded-br-md"
              >
                <FontAwesomeIcon
                  icon={'trash-can'}
                  className="cursor-pointer text-white m-auto"
                />
              </button>
            </div>
          </div>
        );
      })}
      <ActionButton
        className="fixed bottom-[25px] right-[25px]"
        text="+"
        onClick={() => {
          navigate('/add');
        }}
      />
    </div>
  );
}
