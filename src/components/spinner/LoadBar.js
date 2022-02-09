import './loadBar.css'

const LoadBar = (props) => {
  return (
    <div className={'loadBar ' + props.status}>
      <div className="loadBarInner">
        <div className={'lds-facebook'}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>{props.message}</h4>
      </div>
    </div>
  )
}

export default LoadBar
