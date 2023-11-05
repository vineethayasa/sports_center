/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { fetchPreferences } from "../../context/preferences/actions";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";
import {
  usePreferenceDispatch,
  usePreferenceState,
} from "../../context/preferences/context";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { useTeamDispatch, useTeamState } from "../../context/teams/context";
import { Sport } from "../../context/sports/reducer";
import { Team } from "../../context/teams/reducer";

const Preferences: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatchPreferences = usePreferenceDispatch();
  const dispatchSports = useSportDispatch();
  const dispatchTeams = useTeamDispatch();

  useEffect(() => {
    fetchPreferences(dispatchPreferences);
    fetchSports(dispatchSports);
    fetchTeams(dispatchTeams);
  }, [dispatchPreferences, dispatchSports, dispatchTeams]);

  const state: any = usePreferenceState();
  const { preferences } = state;

  const state2: any = useSportState();
  const { sports } = state2;

  const state3: any = useTeamState();
  const { teams } = state3;

  console.log(preferences);
  console.log(sports);
  console.log(teams);
  console.log("gsdf");

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openDialog} className="text-blue-600 hover:underline">
        <Cog8ToothIcon className="h-8 w-8 text-white mr-2" aria-hidden="true" />
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDialog}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-blue-600"
                >
                  Favorite Sports
                </Dialog.Title>

                <div className="mt-4 flex flex-wrap">
                  <div className="w-1/2">
                    {sports.slice(0, sports.length / 2).map((sport: Sport) => (
                      <label key={sport.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2">{sport.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="w-1/2">
                    {sports.slice(sports.length / 2).map((sport: Sport) => (
                      <label key={sport.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2">{sport.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-blue-600 mt-6"
                >
                  Favorite Teams
                </Dialog.Title>
                <div className="mt-4 flex flex-wrap">
                  <div className="w-1/2">
                    {teams.slice(0, teams.length / 2).map((team: Team) => (
                      <label key={team.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2">{team.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="w-1/2">
                    {teams.slice(teams.length / 2).map((team: Team) => (
                      <label key={team.id} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                        />
                        <span className="ml-2">{team.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Save
                  </button>
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

export default Preferences;
