import StringifyJSON from './StringifyJSON'

const List = (props) => {
  const {name, data, renderData} = props
  return (
    <>
      {name && <h1>{name}</h1>}
      {data.map(d => renderData ? renderData(d) : <StringifyJSON json={d}/>)}
    </>
  )
}

export default List