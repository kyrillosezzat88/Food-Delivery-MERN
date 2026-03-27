import ContentLoader from "react-content-loader";
import type { IContentLoaderProps } from "react-content-loader";

const ProductSkeleton = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      speed={2}
      width={253}
      height={241}
      viewBox="0 0 253 241"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="10" y="68" rx="0" ry="0" width="1" height="0" />
      <rect x="18" y="12" rx="0" ry="0" width="220" height="149" />
      <rect x="154" y="75" rx="0" ry="0" width="0" height="1" />
      <rect x="191" y="81" rx="0" ry="0" width="1" height="25" />
      <rect x="128" y="65" rx="0" ry="0" width="1" height="0" />
      <rect x="184" y="141" rx="0" ry="0" width="2" height="0" />
      <rect x="18" y="174" rx="0" ry="0" width="136" height="12" />
      <rect x="129" y="189" rx="0" ry="0" width="1" height="0" />
      <rect x="19" y="191" rx="0" ry="0" width="39" height="5" />
      <rect x="174" y="212" rx="8" ry="8" width="64" height="17" />
      <rect x="17" y="213" rx="0" ry="0" width="91" height="17" />
      <rect x="76" y="229" rx="0" ry="0" width="2" height="0" />
    </ContentLoader>
  );
};

export default ProductSkeleton;
