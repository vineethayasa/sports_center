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

  useEffect(() => {
    fetchMatchById(match.id!)
      .then((data) => {
        setMatch(data || null);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [match.id]);

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
          <h3 className="text-lg font-semibold mb-2">
            {currentMatch.sportName}
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
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-25" />
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
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-blue-700"
                >
                  {currentMatch?.sportName}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-m font-medium leading-6 text-gray-900">
                    Location:
                  </p>
                  <p className="text-m text-gray-700">
                    {currentMatch?.location}
                  </p>
                </div>
                <div>
                  <p className="text-m mt-1 font-medium leading-6 text-gray-900">
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
