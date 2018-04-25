import React, {Component} from 'react'
import classNames from 'classnames'

import classes from './index.scss'

const SlideWrapper = ({ children, isCurrent, isPrevious, isNext }) => {

  const classnames = classNames(
    classes.SlideWrapper,
    isCurrent  ? classes.current  : '',
    isPrevious ? classes.previous : '',
    isNext     ? classes.next     : ''
  )

  return (
    <div className={classnames}>

      { children }

    </div>
  )
}

const SlideManager = ({ children, currentSlide=0 }) => (
  <div className={classes.SlideManager}>
    {
      children.map((slide,i) => (
        <SlideWrapper
          isCurrent={i == currentSlide}
          isPrevious={i + 1 == currentSlide}
          isNext={i - 1 == currentSlide}
          key={i}>

          { slide }
        </SlideWrapper>
      ))
    }
  </div>
)

export default SlideManager
