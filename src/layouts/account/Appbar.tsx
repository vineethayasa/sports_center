/* eslint-disable no-empty-pattern */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/logo.png";
import Preferences from "./Preferences";

let userNavigation = [
  { name: "Login", href: "/signin" },
  { name: "Sign up", href: "/signup" },
];

const userNavigation2 = [
  { name: "Sign out", href: "/logout" },
  // { name: "Change Password", href: "/" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  let auth = false;
  if (localStorage.getItem("authToken")) {
    userNavigation = userNavigation2;
    auth = true;
  }

  return (
    <Disclosure as="nav" className="bg-blue-600 border-b border-slate-200">
      {({}) => (
        <div className="px-4 ml-6">
          <div className="flex h-16 items-center justify-between ">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-2">
                <img
                  className="h-11 w-11 rounded-full border border-white"
                  src={Logo}
                  alt="Logo"
                />
              </div>
              <div className="ml-3 text-xl font-bold text-gray-100">
                Sports Center
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center">
                <Menu as="div" className="relative">
                  <div>
                    {auth && <Preferences />}
                    <Menu.Button className="ml-2 rounded-full p-1 text-gray-400 hover:text-blue-600">
                      <UserCircleIcon
                        className="h-8 w-8 text-white mr-2"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Appbar;
