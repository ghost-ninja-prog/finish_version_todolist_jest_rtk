import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={600}
    height={32}
    viewBox="0 0 600 32"
    backgroundColor="#f5f5f5"
    foregroundColor="#d9d9d9"
  >
    <rect x="129" y="0" rx="3" ry="3" width="316" height="30" /> 
    <rect x="5" y="7" rx="0" ry="0" width="16" height="16" /> 
    <rect x="563" y="2" rx="3" ry="3" width="32" height="32" /> 
    <rect x="519" y="2" rx="3" ry="3" width="32" height="32" />
  </ContentLoader>
)

export default Skeleton