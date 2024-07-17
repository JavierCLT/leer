import MetodoLectura from '../components/MetodoLectura'
import '../styles/globals.css'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Método de Lectura Español</h1>
      <MetodoLectura />
    </div>
  )
}
