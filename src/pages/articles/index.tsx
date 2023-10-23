import ArticlesList from "./ArticlesList";
import Favorites from "./favorites";

const Articles = () => {
  return (
    <div className="flex">
      <div className="w-3/4">
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-2">Trending News</h2>
        </div>
        <ArticlesList />
      </div>
      <div className="w-1/4">
        <Favorites />
      </div>
    </div>
  );
};

export default Articles;
