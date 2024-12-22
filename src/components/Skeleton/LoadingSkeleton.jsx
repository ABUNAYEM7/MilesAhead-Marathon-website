import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#211f1f" highlightColor="#0091bd">
    <div className="card bg-base-100 max-w-[400px] max-h-[300px] image-full shadow-xl">
      <figure>
        <Skeleton height={200} width="100%" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">
          <Skeleton width="60%" />
        </h2>
        <p className="text-white font-medium">
          <Skeleton count={2} />
        </p>
        <p className="text-white text-base font-medium flex items-center gap-1">
          <Skeleton width={50} />
        </p>
        <p className="text-white text-base font-medium">
          <Skeleton width="40%" />
        </p>
        <div className="card-actions justify-end">
          <Skeleton width={100} height={40} />
        </div>
      </div>
    </div>
  </SkeletonTheme>
  );
};

export default CardSkeleton;
