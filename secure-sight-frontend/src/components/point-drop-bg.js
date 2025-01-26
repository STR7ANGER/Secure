const PointDropBG = () => {
  return (
    <div
      className="bg-pattern point-drop-container"
    >
      <div className="lines">
        {" "}
        {/* Add lines div here */}
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="bg-overlay"></div>
    </div>
  )
}

export default PointDropBG;