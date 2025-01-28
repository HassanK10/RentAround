import "../App.css";
import "../loader.css";
import "../button.css";
import Cart from "./Cart";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "./SearchContext";
import { NavLink } from "react-router-dom";
import slugify from 'slugify'

interface Card {
  id: string;
  title: string;
  price: string;
  address: string;
  image: string;
  addressimage: string;
}

const fetchCards = async (query: string): Promise<Card[]> => {
  const response = await fetch(`/db.json`);
  const data = await response.json();
  if (!query.trim()) {
    return data.cards;
  }

  return data.cards.filter((card: Card) =>
    card.title.toLowerCase().includes(query.toLowerCase())
  );
};
const handleClick = () => {
  <Cart />;
};
const Page2 = () => {
  const { searchQuery } = useSearch();
  const {
    data: cards,
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
  } = useQuery<Card[]>({
    queryKey: ["cards", searchQuery],
    queryFn: () => fetchCards(searchQuery),
    retry: 2,
    staleTime: 10000,
  });

  const limitedCards = cards?.slice(0, 12);
  const handleRetry = () => {
    refetch();
  };
  return (
    <>
      <div className="container-fluid Page-2" style={{ overflowX: "hidden" }}>
        {(isLoading || isFetching) && (
          <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        )}
        {isError && (
          <div>
            <p className="text-center error">
              Error: {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <button className="button button-item" onClick={handleRetry}>
              <span className="button-bg">
                <span className="button-bg-layers">
                  <span className="button-bg-layer button-bg-layer-1 -purple"></span>
                  <span className="button-bg-layer button-bg-layer-2 -turquoise"></span>
                  <span className="button-bg-layer button-bg-layer-3 -yellow"></span>
                </span>
              </span>
              <span className="button-inner">
                <span className="button-inner-static">Retry</span>
                <span className="button-inner-hover">Retry</span>
              </span>
            </button>
          </div>
        )}
        {!isLoading && !isError && data && (
          <div className="row page-2-cards">
            {limitedCards?.map((card) => (
              <div key={card.id} className="col-12 col-sm-6 col-lg-3">
                <NavLink
                  to={`/product/${slugify(card.title, { lower: true })}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card caard" onClick={handleClick}>
                    <img
                      src={card.image}
                      className="card-img-top img-fluid"
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title title">{card.title}</h5>
                      <p className="card-text price">&#8364;{card.price}</p>
                      <p className="add">
                        <img src={card.addressimage} alt="" /> {card.address}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Page2;
