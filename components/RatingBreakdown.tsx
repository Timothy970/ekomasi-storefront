import RatingProgressBar from "./RatingProgressBar";

export default function RatingBreakdown() {
  const ratings = {
    5: 120,
    4: 80,
    3: 30,
    2: 10,
    1: 5,
  };

  const total =
    ratings[5] + ratings[4] + ratings[3] + ratings[2] + ratings[1];

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {([5, 4, 3, 2, 1] as const).map((stars) => (
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
