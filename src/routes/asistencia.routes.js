const { Router } = require('express')
const verificarToken = require('../tools/verificarToken')
const Evento = require('../models/evento')
const Asistencia = require('../models/asistencia')

const router = Router()

router.post('/asistencia/nuevo', verificarToken, async(req, resp) => {
    const usuario = req.usuario
    const { eventoId } = req.body
    const evento = await Evento.findById(eventoId)
    const asistencia = await Asistencia.create({ usuario, evento })
    return resp.json({
        msg: "Exito",
        asistencia
    })
})

router.get('/mis-asistencias', verificarToken, async(req, resp) => {
    const usuario = req.usuario
    const asistencias = await Asistencia.find({ usuario }).populate('evento')
    let eventos = []
    for (let i = 0; i < asistencias.length; i++) {
        const asistencia = asistencias[i];
        eventos.push(asistencia.evento)
    }
    return resp.json({
        eventos
    })
})

module.exports = router