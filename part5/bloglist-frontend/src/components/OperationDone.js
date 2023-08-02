
const OperationDone = ({ message }) => {
  if (message === '') {
    return null
  }
  return (
    <div className='operation'>
      {message}
    </div>
  )
}

export default OperationDone