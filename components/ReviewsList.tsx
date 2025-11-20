import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
    const exampleReviews = [
        {
            rating: 5,
            date: "April 18, 2025",
            reviewer: "Jennifer",
            title: "So Pleased!",
            reviewText:
                "This has become my everyday pram. It’s so lightweight yet sturdy and little one is very comfy in it. There isn’t a lot of basket space but that’s to be expected with a compact pram. I wish the recline function was slightly more user friendly but all in all we’re really pleased and wish we have purchased... Read more",
        },
        {
            rating: 4,
            date: "March 10, 2025",
            reviewer: "Mark",
            title: "Good value",
            reviewText: "The pram works well but the basket is small. Recommended for city use.",
        },
        {
            rating: 3,
            date: "February 22, 2025",
            reviewer: "Sophie",
            title: "Okay product",
            reviewText: "It’s decent for the price but I expected better suspension.",
        },
        {
            rating: 5,
            date: "January 15, 2025",
            reviewer: "Liam",
            title: "Best pram ever!",
            reviewText: "Lightweight, strong, and easy to fold. Highly recommended.",
        },
        {
            rating: 2,
            date: "December 9, 2024",
            reviewer: "Emma",
            title: "Not so great",
            reviewText: "Difficult to recline and hard to maneuver on rough surfaces.",
        },
        {
            rating: 4,
            date: "November 20, 2024",
            reviewer: "Oliver",
            title: "Solid choice",
            reviewText: "Good build quality but basket space is lacking.",
        },
        {
            rating: 5,
            date: "October 30, 2024",
            reviewer: "Isabella",
            title: "Love it!",
            reviewText: "My baby loves it and so do I. Very easy to handle.",
        },
        {
            rating: 3,
            date: "October 5, 2024",
            reviewer: "Noah",
            title: "Average",
            reviewText: "Not bad but the wheels could be better.",
        },
        {
            rating: 4,
            date: "September 18, 2024",
            reviewer: "Ava",
            title: "Good stroller",
            reviewText: "Nice design and comfortable for baby.",
        },
        {
            rating: 1,
            date: "August 12, 2024",
            reviewer: "Ethan",
            title: "Disappointed",
            reviewText: "Not worth the money. Feels cheap.",
        },
    ];

    return (
        <div>
            {exampleReviews.map((review, i) => (
                <ReviewCard key={i} {...review} />
            ))}
        </div>
    );
}
