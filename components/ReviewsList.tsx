import { selectProductReviews } from "@/lib/features/navigation/navigationSlice";
import ReviewCard from "./ReviewCard";
import { useAppSelector } from "@/lib/hooks";

export default function ReviewsList() {
    const reviews = useAppSelector(selectProductReviews)

    return (
        <div>
            {reviews?.reviews.map((review, i) => (
                <ReviewCard key={i} {...review} />
            ))}
        </div>
    );
}
