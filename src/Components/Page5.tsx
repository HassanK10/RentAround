import { useState, useEffect, useRef, TouchEvent, MouseEvent } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James L.",
    role: "Event Planner",
    rating: 4,
    content:
      "As a small business owner, I needed equipment but didn't want to buy it outright. Rentaround gave me the flexibility to rent what I needed quickly and affordably.",
  },
  {
    id: 2,
    name: "Emily R.",
    role: "Frequent User",
    rating: 5,
    content:
      "I love the convenience of being able to rent everything from one app. From weekend getaways to party supplies, Rentaround has it all",
  },
  {
    id: 3,
    name: "Mark A.",
    role: "Content Creator",
    rating: 4,
    content:
      "Rentaround's influencer program has been a game-changer. Not only do I rent out my camera gear, but I've also started earning more by promoting it through my network.",
  },
  {
    id: 4,
    name: "Karen D.",
    role: "Traveler",
    rating: 5,
    content:
      "The interactive map feature is a game-changer for me. Finding rentals in my area is quick and easy. I've saved time and money, and the variety of options is unbeatable.",
  },
  {
    id: 5,
    name: "Michael P.",
    role: "Photography Enthusiast",
    rating: 5,
    content:
      "The quality of rental equipment has exceeded my expectations. Everything arrives in perfect condition, and the process is seamless.",
  },
  {
    id: 6,
    name: "Sarah M.",
    role: "Small Business Owner",
    rating: 4,
    content:
      "Rentaround has helped me scale my business without the huge upfront costs. The customer service is exceptional!",
  },
  {
    id: 7,
    name: "David K.",
    role: "DIY Enthusiast",
    rating: 5,
    content:
      "Whether it's power tools or camping gear, I always find what I need. The pricing is transparent and the booking process is straightforward.",
  },
  {
    id: 8,
    name: "Lisa T.",
    role: "Event Coordinator",
    rating: 5,
    content:
      "I've been using Rentaround for all my event equipment needs. The reliability and professionalism are unmatched in the industry.",
  },
];

function Page5() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setPrevTranslate(-index * 25);
    setCurrentTranslate(-index * 25);
  };

  const nextSlide = () => {
    const next = currentSlide + 4 >= testimonials.length ? 0 : currentSlide + 4;
    goToSlide(next);
  };

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentSlide]);

  const handleTouchStart = (e: TouchEvent) => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsDragging(true);
    setStartPos(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    const diff = currentPosition - startPos;
    const translate = prevTranslate + (diff / window.innerWidth) * 100;
    setCurrentTranslate(translate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    const diff = currentPosition - startPos;
    const translate = prevTranslate + (diff / window.innerWidth) * 100;
    setCurrentTranslate(translate);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const diff = currentTranslate - prevTranslate;

    if (Math.abs(diff) > 10) {
      if (diff > 0 && currentSlide > 0) {
        goToSlide(currentSlide - 4);
      } else if (diff < 0 && currentSlide < testimonials.length - 4) {
        goToSlide(currentSlide + 4);
      } else {
        goToSlide(currentSlide);
      }
    } else {
      goToSlide(currentSlide);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`fs-4 ${index < rating ? "text-warning" : "text-secondary"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-vh-100 bg-light py-5 px-3 Page-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">
          What people are saying
        </h2>

        <div className="position-relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div
              className={`d-flex test-cards transition-transform ${
                isDragging ? "" : "ease-in-out"
              }`}
              style={{
                transform: `translateX(${currentTranslate}%)`,
                transition: `${isDragging ? "none" : "0.5s"}`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="col-12 col-sm-6 col-lg-3 px-3 flex-shrink-0"
                >
                  <div className="bg-white rounded shadow p-4 h-100">
                    <div className="d-flex mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <h3 className="fs-5 fw-semibold mb-3">
                      Recommended / Credible Testimonials
                    </h3>
                    <div className="mb-3">
                      <p className="text-secondary">{testimonial.content}</p>
                    </div>
                    <div className="mt-auto">
                      <p className="fw-medium mb-0">{testimonial.name}</p>
                      <p className="text-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4 gap-2">
            {Array.from({ length: testimonials.length / 4 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * 4)}
                className={`rounded-circle border-0 ${
                  currentSlide === index * 4 ? "bg-primary" : "bg-secondary"
                }`}
                style={{ width: "8px", height: "8px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page5;
