/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { fetchArticlebyId } from "../../context/articles/actions";
import { Article } from "../../context/articles/reducer";

type ArticleDetailsProps = {
  article: Article;
};

const Articles: React.FC<ArticleDetailsProps> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentarticle, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticlebyId(article.id!)
      .then((data) => {
        setArticle(data || null);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [article.id]);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <a
        href="#"
        onClick={openDialog}
        className="text-blue-500 hover:underline"
      >
        Read More
      </a>
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {currentarticle?.title}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    Date:{" "}
                    {currentarticle?.date
                      ? currentarticle.date.slice(0, 10)
                      : "Unknown"}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    {" "}
                    Sport:{" "}
                    {currentarticle?.sport
                      ? currentarticle.sport.name
                      : "Unknown"}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    {currentarticle?.content}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src={currentarticle?.thumbnail}
                    alt={currentarticle?.title}
                    className="w-64 h-64 mx-auto"
                  />
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

export default Articles;
