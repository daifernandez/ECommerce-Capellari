import { StarIcon } from "@heroicons/react/24/solid";

export default function Stars({ count }) {
  return (
    <div className="flex mb-4 items-center">
      {[...Array(5)].map((_, index) => {
        const className =
          index < count ? "h-5 w-5 text-yellow-500" : "h-5 w-5 text-gray-400";
        return <StarIcon key={index} className={className} />;
      })}
      <p className="text-gray-400 font-medium mx-2">{count}</p>
    </div>
  );
}
