import express from 'express'
import cluster from 'cluster'
import { cpus } from 'os' 
  
const numSubProcesos = cpus().length
console.log(numSubProcesos)

if (cluster.isPrimary) {
  console.log("Soy el proceso principal supervisor")
  for (let i = 0; i < numSubProcesos; i++) {
    cluster.fork() //Genero 8 proceso hilo
  }

} else {
  const app = express()
  console.log(`Hola, soy un subproceso con el id ${process.pid}`)
  app.get("/operacionsimple", (req, res) => {
    let suma = 0
    console.log(`Hola, el subproceso ejecutando tiene el id ${process.pid}`)  
    for (let i = 0; i < 10000; i++) {
      suma += i
    }
    res.json(suma)
  })

  app.get("/operacioncompleja", (req, res) => {
    let suma = 0
    console.log(`Hola, el subproceso ejecutando tiene el id ${process.pid}`)  
    for (let i = 0; i < 5e8; i++) {
      suma += i
    }
    res.json(suma)
  })

  app.listen(4000, () => console.log("Server on Port 4000"))
}

