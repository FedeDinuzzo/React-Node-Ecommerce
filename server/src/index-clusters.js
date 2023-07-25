import {env} from "./config/config.js"
import { __dirname } from "./path.js";

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
    console.log(`Hola, soy un subproceso con el id ${env.process.pid}`)
    //cluster.fork() No puedo generar un subproceso a traves de un subproceso
}