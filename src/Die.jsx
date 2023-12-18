export default function Die(props) {

  // creates background color when dice is clicked

  const bkgColor = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFF"
  }

  return (
    <div className='dice' style={bkgColor} onClick={ props.holdDice } >
      <h2>{props.value}</h2>
    </div>
  )
}
