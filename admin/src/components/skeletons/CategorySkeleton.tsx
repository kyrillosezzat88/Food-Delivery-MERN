import ContentLoader from "react-content-loader";
import type { IContentLoaderProps } from "react-content-loader";

const CategorySkeleton = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={140}
      height={156}
      viewBox="0 0 140 156"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="9" y="135" rx="3" ry="3" width="122" height="14" />
      <circle cx="65" cy="66" r="61" />
    </ContentLoader>
  );
};

export default CategorySkeleton;
