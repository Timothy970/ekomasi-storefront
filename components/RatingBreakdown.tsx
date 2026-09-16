import RatingProgressBar from "./RatingProgressBar";

export default function RatingBreakdown({
  score_counts,
}: Readonly<{
  score_counts: { score: number; count: number }[];
}>) {
  const ratings: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  score_counts?.forEach(({ score, count }) => {
    if (ratings[score] !== undefined) {
      ratings[score] = count;
    }
  });

  const total = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {[5, 4, 3, 2, 1].map((stars) => (
        <div key={stars} className="flex items-center justify-between gap-3 w-full">
          <span className="text-sm">{stars} stars</span>

          <div className="flex-1">
            <RatingProgressBar count={ratings[stars]} total={total} />
          </div>

          <span className="text-sm w-6 text-right">{ratings[stars]}</span>
        </div>
      ))}
    </div>
  );
}
