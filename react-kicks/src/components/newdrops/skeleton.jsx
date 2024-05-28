import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  
  <ContentLoader 
    speed={2}
    width={245}
    height={450}
    viewBox="0 0 360 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="29" ry="29" width="330" height="374" /> 
    <rect x="209" y="411" rx="0" ry="0" width="6" height="9" /> 
    <rect x="5" y="461" rx="10" ry="10" width="156" height="40" /> 
    <rect x="5" y="396" rx="10" ry="10" width="262" height="33" /> 
    <rect x="5" y="432" rx="11" ry="11" width="260" height="26" /> 
    <rect x="5" y="515" rx="15" ry="15" width="319" height="66" />
  </ContentLoader>
)

export default MyLoader