import slugify from "slugify";
import NavBar from "./NavBar";
import Page6 from "./Page6";
import "../App.css";
import { useCart } from "./UseCart";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SearchProvider } from "./SearchContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
interface Cards {
  id: string;
  title: string;
  image: string;
  price: number;
}

const fetchCards = async (): Promise<Cards[]> => {
  const response = await fetch("/db.json");
  const data = await response.json();
  return data.cards;
};
const notify = () => toast.success("Added To Cart!");

const AddToCart = () => {
  const { title } = useParams<{ title: string }>();
  const { addItemToCart } = useCart();
  const {
    data: cards,
    isLoading,
    error,
  } = useQuery<Cards[]>({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Something went wrong!</p>;

  const card = cards?.find((c) => slugify(c.title, { lower: true }) === title);
  if (!card) return <p>Product not found!</p>;
  const handleAddToCart = () => {
    addItemToCart.mutate({
      id: card.id,
      title: card.title,
      price: card.price,
      image: card.image,
      quantity: 1,
    });
  };

  return (
    <>
      <SearchProvider>
        <NavBar />
        <div className="container-fluid Add-To-Cart">
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-left">
                <h2 className="cart-title">{card.title}</h2>
                <div className="image">
                  <img src={card.image} alt="" className="cart-image" />
                  
                  <div className="product-description">
                    <h2>Product Desicription</h2>
                  </div>
                  <div className="description">
                    <p>Description</p>
                  </div>
                </div>
              </div>
              <div className="cart-right">
                <div className="price-container">
                  <div className="pricing">
                    <div className="price">
                      <h2>Price</h2>
                      <h2 className="price2">&#8364;{card.price}</h2>
                    </div>
                    <div className="date-picker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker", "DatePicker"]}
                        >
                          <DemoItem label="Select check-in Date">
                            <DatePicker />
                          </DemoItem>
                          <DemoItem label="Select check-out Date">
                            <DatePicker maxDate={dayjs("2022-04-17")} />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="total-container">
                    <div className="price price-2">
                      <h2 className="total">Total</h2>
                      <h2 className="h2">&#8364;{card.price}</h2>
                    </div>
                    <button
                      className="cart-button"
                      onClick={() => {
                        handleAddToCart();
                        notify();
                      }}
                      style={{ marginBottom: "2vw" }}
                    >
                      Add To Cart
                    </button>
                    <Toaster position="bottom-center" />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3.5vw",
                  }}
                  className="map"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.9481664299196!2d71.71211367498562!3d29.40107234876753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b91b06dcbcb9b%3A0xb4d44444d2e8acdd!2sCommercial%20area!5e0!3m2!1sen!2s!4v1738063213152!5m2!1sen!2s"
                    width="600"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Page6 />
      </SearchProvider>
    </>
  );
};

export default AddToCart;
