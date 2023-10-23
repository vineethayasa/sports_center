/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { fetchMatchById } from "../../context/matches/actions";
import { Match } from "../../context/matches/reducer";

type MatchDetailsProps = {
  match: Match;
};

const Matches: React.FC<MatchDetailsProps> = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMatch, setMatch] = useState<Match | null>(null);

  const fetchData = () => {
    fetchMatchById(match.id!)
      .then((data) => {
        setMatch(data || null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [match.id]);

  const refreshData = () => {
    fetchData();
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      {currentMatch && (
        <>
          <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
            <span>{currentMatch.sportName}</span>
            <button
              className="focus:outline-none hover:shadow-lg hover:bg-gray-100 hover:rounded-full "
              onClick={refreshData}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </h3>
          <p>
            <strong>Location:</strong> {currentMatch.location}
          </p>
          <p>
            <strong>Score:</strong>
          </p>
          <ul>
            {currentMatch.teams &&
              currentMatch.teams.map((team) => (
                <li key={team.id}>
                  {team.name}: {currentMatch.score[team.name]}
                </li>
              ))}
          </ul>
          <a
            href="#"
            onClick={openDialog}
            className="text-blue-600 hover:underline"
          >
            Read More
          </a>
        </>
      )}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDialog}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-blue-700"
                >
                  {currentMatch?.name}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-m font-medium leading-6 text-blue-800">
                    Sport:
                  </p>
                  <p className="text-m text-gray-700">
                    {currentMatch?.sportName}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-m font-medium leading-6 text-blue-800">
                    Location:
                  </p>
                  <p className="text-m text-gray-700">
                    {currentMatch?.location}
                  </p>
                </div>
                <div>
                  <p className="text-m mt-1 font-medium leading-6 text-blue-800">
                    Score:
                  </p>
                  <ul>
                    {currentMatch?.teams &&
                      currentMatch?.teams.map((team) => (
                        <li key={team.id}>
                          {team.name}: {currentMatch.score[team.name]}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-700">{currentMatch?.story}</p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeDialog}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Matches;
