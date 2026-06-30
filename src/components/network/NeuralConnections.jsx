import NeuralConnection from './NeuralConnection'

export default function NeuralConnections({
  edges,
}) {
  return (
    <>
      {edges.map(
        (edge, index) => (
          <NeuralConnection
            key={index}
            start={edge.start}
            end={edge.end}
          />
        )
      )}
    </>
  )
}