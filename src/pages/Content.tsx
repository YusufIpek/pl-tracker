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

  return (
    <div className="m-10">
      <Input type="text" placeholder="Suchen" name="search" />
      {privateLessons.map((pL) => {
        return (
          <div key={pL.id} className="flex mt-2  bg-gray-200 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-3 pl-3 w-full">
              <div className="flex justify-between sm:block sm:m-auto p-1 sm:p-0">
                <div className="font-bold text-center">Schüler</div>
                <div className="w-full text-center">{pL.student}</div>
              </div>
              <div className="flex justify-between sm:block sm:m-auto p-1 sm:p-0">
                <div className="font-bold text-center">Fach</div>
                <div className="w-full text-center">{pL.subject}</div>
              </div>
              <div className="flex justify-between sm:block sm:m-auto p-1 sm:p-0">
                <div className="font-bold text-center">Start</div>
                <div className="w-full text-center">
                  {new Date(pL.start).toLocaleString('de-DE')}
                </div>
              </div>
              <div className="flex justify-between sm:block sm:m-auto p-1 sm:p-0">
                <div className="font-bold text-center">Ende</div>
                <div className="w-full text-center">
                  {new Date(pL.end).toLocaleString('de-DE')}
                </div>
              </div>
            </div>
            <div className="w-fit text-center relative">
              <button
                onClick={() => editEntry(pL.id)}
                className="h-full w-[60px] bg-blue-600 rounded-tl-md rounded-bl-md"
              >
                <FontAwesomeIcon
                  icon={'edit'}
                  className="cursor-pointer text-white m-auto"
                />
              </button>
            </div>
            <div className="w-fit text-center relative">
              <button
                onClick={() => deleteEntry(pL.id)}
                className="h-full w-[60px] bg-red-600 rounded-tr-md rounded-br-md"
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
        className="absolute bottom-[35px] right-[45px]"
        text="+"
        onClick={() => {
          navigate('/add');
        }}
      />
    </div>
  );
}
