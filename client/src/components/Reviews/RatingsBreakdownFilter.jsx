import React, { useState } from "react"

const RatingsBreakdownFilter = ({ rating, totalReviews, ratingsObject, setStarFilters, starFilters }) => {

  const [filterStatus, setFilterStatus] = useState(false)

  const ratings = (ratingsObject[rating] / totalReviews) * 100
  const fillStyle = {width: `${ratings}%`}

  const applyStarFilter = (e) => {
    if (!filterStatus) {
      setStarFilters([...starFilters, rating])
    } else {
      const index = starFilters.indexOf(rating)
      let tempFilters = [...starFilters]
      tempFilters.splice(index, 1)
      setStarFilters(tempFilters)
    }
    setFilterStatus(!filterStatus)
  }

  return (
    <div className="ratings-breakdown-filter">
      <div
        className="ratings-breakdown-filter-button hover"
        value={rating}
        onClick={applyStarFilter}
      >{`${rating} stars`}</div>
      <div className="ratings-breakdown-filter-bar">
        <div
          className="ratings-breakdown-filter-fill"
          style={fillStyle}
        >
          <span></span>
        </div>
        <span></span>
      </div>
    </div>
  )
}

export default RatingsBreakdownFilter