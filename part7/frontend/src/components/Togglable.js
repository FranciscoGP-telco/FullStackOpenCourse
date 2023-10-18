import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'antd'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} type='primary'>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button onClick={toggleVisibility} type='dashed' >{props.cancelLabel}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable