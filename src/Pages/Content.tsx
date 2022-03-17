import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../Components/ActionButton';
import Input from '../Components/Input';
import { PrivateLesson } from '../Models/PrivateLesson';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTrashCan);

export default function Content() {
  const navigate = useNavigate();

  const privateLessons: PrivateLesson[] = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const deleteEntry = (id?: string) => {
    if (id) {
      if (confirm('Eintrag löschen?')) {
      }
    }
  };

  return (
    <div className="m-10">
      <Input type="text" placeholder="Suchen" name="search" />
      {privateLessons.map((pL) => {
        return (
          <div
            key={pL.id}
            className="grid grid-cols-5 mt-2 p-3 bg-gray-200 rounded-md"
          >
            <div className="m-auto">{pL.studentName}</div>
            <div className="m-auto">
              {new Date(pL.startTimestamp).toLocaleDateString('de-DE')}
            </div>
            <div className="m-auto">
              {new Date(pL.endTimestamp).toLocaleDateString('de-DE')}
            </div>
            <div className="m-auto">{pL.subject}</div>
            <div className="w-full text-center">
              <button
                onClick={() => deleteEntry(pL.id)}
                className="w-full h-[30px] md:w-[100px] bg-red-600 rounded-xl"
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
