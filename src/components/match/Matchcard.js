import React from 'react'
import { updateChinese, updateEnglish } from '../root/rootSlice'
import { useDispatch, useSelector } from 'react-redux'

const Matchcard = (props) => {
  const dispatch = useDispatch()
  const selection = useSelector((state) => state.root.data.selection)
  let active = ''
  let activeTest = `${props.word.group_id}.${props.word.id}`

  if (props.type === 'chinese') {
    active = selection.chinese
  } else {
    active = selection.english
  }
  let disabled = props.disabled.includes(activeTest)
  const onClick = (e) => {
    let type = props.type
    let id = `${props.word.group_id}.${props.word.id}`

    if (!disabled) {
      if (type === 'chinese') {
        dispatch(updateChinese(id))
      } else {
        dispatch(updateEnglish(id))
      }
    }
  }

  return (
    <div
      data-type={props.type}
      data-id={props.word.id}
      onClick={(e) => {
        onClick(e)
      }}
      className={`matchCard ${active === activeTest ? 'active' : ''} ${
        disabled ? 'disabled' : ''
      }`}
    >
      {props.type === 'chinese' ? props.word.chinese : props.word.english}
    </div>
  )
}

export default Matchcard
